"use client"

import { useState } from "react"

type AffordableListingsFilterProps = {
  onFilter: (maxRent: number) => void
}

export default function AffordableListingsFilter({ onFilter }: AffordableListingsFilterProps) {
  const [maxRent, setMaxRent] = useState(1200)

  const handleFilter = () => {
    onFilter(maxRent)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Affordable Listings</h2>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="500"
          max="3000"
          step="100"
          value={maxRent}
          onChange={(e) => setMaxRent(Number.parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-gray-600">Max: ${maxRent}</span>
      </div>
      <button
        onClick={handleFilter}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      >
        Filter Affordable Listings
      </button>
    </div>
  )
}

