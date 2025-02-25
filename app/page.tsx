import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to MoveMate</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Connect with people moving out and find your next home - no agents, no exorbitant fees.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href="/post-move-out"
          className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">Post Your Move-Out</h2>
          <p className="text-gray-600">List your current place and connect with potential new tenants.</p>
        </Link>
        <Link
          href="/house-hunting"
          className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">House Hunting</h2>
          <p className="text-gray-600">Find your next home from people moving out soon.</p>
        </Link>
        <Link
          href="/chat"
          className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">Connect & Chat</h2>
          <p className="text-gray-600">Communicate directly with potential matches.</p>
        </Link>
        <Link
          href="/community"
          className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">Community Vibes</h2>
          <p className="text-gray-600">Share your moving stories and experiences with the community.</p>
        </Link>
      </div>
    </main>
  )
}

