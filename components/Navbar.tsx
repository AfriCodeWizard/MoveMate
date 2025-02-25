"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">MoveMate</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/post-move-out"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Post Move-Out
            </Link>
            <Link
              href="/house-hunting"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              House Hunting
            </Link>
            <Link
              href="/chat"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Chat
            </Link>
            <Link
              href="/community"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Community
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6 text-gray-500" /> : <Menu className="h-6 w-6 text-gray-500" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            href="/post-move-out"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            Post Move-Out
          </Link>
          <Link
            href="/house-hunting"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            House Hunting
          </Link>
          <Link
            href="/chat"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            Chat
          </Link>
          <Link
            href="/community"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            Community
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar

