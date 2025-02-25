"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { put } from "@vercel/blob"

type MoveOutFormData = {
  moveOutDate: string
  location: string
  rent: number
  size: string
  description: string
  tags: string[]
}

export default function PostMoveOut() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoveOutFormData>()

  const onSubmit = async (data: MoveOutFormData) => {
    setIsSubmitting(true)
    try {
      // Upload images to Vercel Blob
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const { url } = await put(`move-outs/${Date.now()}-${image.name}`, image, {
            access: "public",
          })
          return url
        }),
      )

      const response = await fetch("/api/post-move-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, images: imageUrls }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit move-out details")
      }

      router.push("/post-move-out/success")
    } catch (error) {
      console.error("Error submitting move-out details:", error)
      alert("Failed to submit move-out details. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Post Your Move-Out</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="moveOutDate" className="block mb-1 font-medium">
            Move-out Date
          </label>
          <input
            type="date"
            id="moveOutDate"
            {...register("moveOutDate", { required: "Move-out date is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.moveOutDate && <p className="text-red-500 text-sm mt-1">{errors.moveOutDate.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block mb-1 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            {...register("location", { required: "Location is required" })}
            placeholder="City, Area"
            className="w-full p-2 border rounded"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label htmlFor="rent" className="block mb-1 font-medium">
            Rent/Price
          </label>
          <input
            type="number"
            id="rent"
            {...register("rent", { required: "Rent/Price is required", min: 0 })}
            placeholder="Monthly rent"
            className="w-full p-2 border rounded"
          />
          {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>}
        </div>

        <div>
          <label htmlFor="size" className="block mb-1 font-medium">
            Size
          </label>
          <input
            type="text"
            id="size"
            {...register("size", { required: "Size is required" })}
            placeholder="e.g., 1 bedroom, 800 sq ft"
            className="w-full p-2 border rounded"
          />
          {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Describe your place"
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="space-y-2">
            {["Minimalist", "Cozy", "Party Pad", "Student Haven"].map((tag) => (
              <label key={tag} className="inline-flex items-center mr-4">
                <input type="checkbox" value={tag} {...register("tags")} className="form-checkbox" />
                <span className="ml-2">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block mb-1 font-medium">
            Upload Images (up to 10)
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {images.length > 0 && <p className="text-sm text-gray-600 mt-1">{images.length} image(s) selected</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {isSubmitting ? "Submitting..." : "Post Your Move-Out"}
        </button>
      </form>
    </div>
  )
}

