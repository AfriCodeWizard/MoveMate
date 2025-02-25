"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/utils/supabase"

type SavedListing = {
  id: number
  listing_id: number
  user_id: string
  created_at: string
  listing: {
    location: string
    move_out_date: string
    rent: number
  }
}

export default function Dashboard() {
  const { user } = useUser()
  const [savedListings, setSavedListings] = useState<SavedListing[]>([])

  useEffect(() => {
    if (user) {
      fetchSavedListings()
    }
  }, [user])

  const fetchSavedListings = async () => {
    const { data, error } = await supabase
      .from("saved_listings")
      .select(`
        *,
        listing:move_outs(location, move_out_date, rent)
      `)
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching saved listings:", error)
    } else {
      setSavedListings(data || [])
    }
  }

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Move Timeline</h1>
      <div className="space-y-6">
        {savedListings.map((savedListing) => (
          <div key={savedListing.id} className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold">{savedListing.listing.location}</h2>
            <p className="text-gray-600">
              Move-in date: {new Date(savedListing.listing.move_out_date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Rent: ${savedListing.listing.rent}/month</p>
            <div className="mt-2 space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">
                Contact Landlord
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                Schedule Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

