import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl text-center">
      <h1 className="text-3xl font-bold mb-6">Move-Out Details Submitted Successfully!</h1>
      <p className="mb-6">
        Your move-out details have been posted. House hunters will be able to see your listing soon.
      </p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        Return to Home
      </Link>
    </div>
  )
}

