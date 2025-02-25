import { supabase } from "@/utils/supabase"
import ListingCard from "@/components/ListingCard"
import FilterSort from "@/components/FilterSort"
import AffordableListingsFilter from "@/components/AffordableListingsFilter"

export const revalidate = 60 // Revalidate this page every 60 seconds

async function getListings(maxRent?: number) {
  let query = supabase.from("move_outs").select("*").order("move_out_date", { ascending: true })

  if (maxRent) {
    query = query.lte("rent", maxRent)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching listings:", error)
    return []
  }

  return data
}

export default async function HouseHunting({ searchParams }: { searchParams: { maxRent?: string } }) {
  const maxRent = searchParams.maxRent ? Number.parseInt(searchParams.maxRent) : undefined
  const listings = await getListings(maxRent)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Find Your Next Home</h1>
      <AffordableListingsFilter />
      <FilterSort />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}

