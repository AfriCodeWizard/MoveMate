"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type SwipeableGalleryProps = {
  images: string[]
}

export default function SwipeableGallery({ images }: SwipeableGalleryProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="h-64 w-full rounded-lg"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Listing image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

