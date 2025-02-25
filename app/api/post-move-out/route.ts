import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { error } = await supabase.from("move_outs").insert([
      {
        move_out_date: data.moveOutDate,
        location: data.location,
        rent: data.rent,
        size: data.size,
        description: data.description,
        tags: data.tags,
        images: data.images,
      },
    ])

    if (error) throw error

    return NextResponse.json({ message: "Move-out details submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error submitting move-out details:", error)
    return NextResponse.json({ error: "Failed to submit move-out details" }, { status: 500 })
  }
}

