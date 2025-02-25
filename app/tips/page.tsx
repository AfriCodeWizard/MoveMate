import Link from "next/link"

const tips = [
  {
    title: "How to Negotiate Rent",
    content: "Learn effective strategies for negotiating your rent with landlords.",
    link: "/tips/negotiate-rent",
  },
  {
    title: "Moving on a Budget",
    content: "Discover cost-effective ways to plan and execute your move.",
    link: "/tips/budget-moving",
  },
  {
    title: "Understanding Lease Agreements",
    content: "Key points to look for when reviewing a lease agreement.",
    link: "/tips/lease-agreements",
  },
  {
    title: "Maximizing Small Spaces",
    content: "Creative ideas for making the most of compact living areas.",
    link: "/tips/small-spaces",
  },
]

export default function Tips() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Moving Tips</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
            <p className="text-gray-600 mb-4">{tip.content}</p>
            <Link href={tip.link} className="text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

