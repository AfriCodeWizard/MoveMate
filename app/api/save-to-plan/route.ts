import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function POST(request: Request) {
  try {
    const { userId, listingId } = await request.json()

    const { error } = await supabase.from("saved_listings").insert([
      {
        user_id: userId,
        listing_id: listingId,
      },
    ])

    if (error) throw error

    return NextResponse.json({ message: "Listing saved successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error saving listing:", error)
    return NextResponse.json({ error: "Failed to save listing" }, { status: 500 })
  }
}

