"use client"

import Link from "next/link"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import SwipeableGallery from "./SwipeableGallery"

type Listing = {
  id: number
  move_out_date: string
  location: string
  rent: number
  size: string
  description: string
  tags: string[]
  images: string[]
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const { user } = useUser()
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveToPlanner = async () => {
    if (!user) {
      alert("Please sign in to save listings")
      return
    }

    try {
      const response = await fetch("/api/save-to-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, listingId: listing.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to save listing")
      }

      setIsSaved(true)
    } catch (error) {
      console.error("Error saving listing:", error)
      alert("Failed to save listing. Please try again.")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <SwipeableGallery images={listing.images} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{listing.location}</h2>
        <p className="text-gray-600 mb-2">${listing.rent}/month</p>
        <p className="text-sm text-gray-500 mb-2">Available: {new Date(listing.move_out_date).toLocaleDateString()}</p>
        <p className="text-sm mb-4">{listing.description.substring(0, 100)}...</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/listing/${listing.id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
          <button
            onClick={handleSaveToPlanner}
            className={`px-4 py-2 rounded ${
              isSaved ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
            } transition duration-200`}
            disabled={isSaved}
          >
            {isSaved ? "Saved" : "Save to Plan"}
          </button>
        </div>
      </div>
    </div>
  )
}

