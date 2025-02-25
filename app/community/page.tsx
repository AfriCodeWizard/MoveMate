"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/utils/supabase"
import Image from "next/image"

type MoveStory = {
  id: number
  user_id: string
  content: string
  image_url: string
  created_at: string
  user: {
    name: string
  }
}

export default function Community() {
  const { user } = useUser()
  const [moveStories, setMoveStories] = useState<MoveStory[]>([])
  const [newStory, setNewStory] = useState("")
  const [storyImage, setStoryImage] = useState<File | null>(null)

  useEffect(() => {
    fetchMoveStories()
  }, [])

  const fetchMoveStories = async () => {
    const { data, error } = await supabase
      .from("move_stories")
      .select(`
        *,
        user:users(name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching move stories:", error)
    } else {
      setMoveStories(data || [])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newStory.trim()) return

    try {
      let image_url = ""
      if (storyImage) {
        const { data, error } = await supabase.storage
          .from("move-story-images")
          .upload(`${user.id}/${Date.now()}-${storyImage.name}`, storyImage)

        if (error) throw error
        image_url = supabase.storage.from("move-story-images").getPublicUrl(data.path).data.publicUrl
      }

      const { error } = await supabase.from("move_stories").insert({
        user_id: user.id,
        content: newStory.trim(),
        image_url,
      })

      if (error) throw error

      setNewStory("")
      setStoryImage(null)
      fetchMoveStories()
    } catch (error) {
      console.error("Error posting move story:", error)
      alert("Failed to post move story. Please try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Community Vibes</h1>
      {user && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            placeholder="Share your move story..."
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setStoryImage(e.target.files?.[0] || null)}
              className="text-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Post Story
            </button>
          </div>
        </form>
      )}
      <div className="space-y-6">
        {moveStories.map((story) => (
          <div key={story.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="font-semibold">{story.user.name}</div>
              <div className="text-gray-500 text-sm ml-2">{new Date(story.created_at).toLocaleDateString()}</div>
            </div>
            <p className="mb-2">{story.content}</p>
            {story.image_url && (
              <div className="relative h-48 w-full">
                <Image
                  src={story.image_url || "/placeholder.svg"}
                  alt="Move story image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

