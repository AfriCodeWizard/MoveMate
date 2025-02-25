"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/utils/supabase"

type Message = {
  id: number
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export default function Chat() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (user) {
      fetchMessages()
      const subscription = supabase
        .channel("messages")
        .on("INSERT", { event: "messages", schema: "public" }, (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message])
        })
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [user])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching messages:", error)
    } else {
      setMessages(data || [])
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: "PLACEHOLDER_RECEIVER_ID", // Replace with actual receiver ID
      content: newMessage.trim(),
    })

    if (error) {
      console.error("Error sending message:", error)
    } else {
      setNewMessage("")
    }
  }

  if (!user) {
    return <div>Please sign in to use the chat feature.</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>
      <div className="h-96 overflow-y-auto mb-4 border rounded p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender_id === user.id ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.sender_id === user.id ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  )
}

