"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email.includes("@") && email.includes(".")) {
      setStatus("success")
      setMessage("🎉 Welcome to the ethereal community! Check your email for confirmation.")
      setEmail("")

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } else {
      setStatus("error")
      setMessage("Please enter a valid email address.")

      // Reset error after 3 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 overflow-hidden">
          <CardContent className="p-12 text-center relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Mail className="mr-2 h-4 w-4" />
                Stay Connected
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join the Ethereal Journey
              </h2>

              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Be the first to discover new artworks, get exclusive insights into my creative process, and receive
                special offers on limited edition pieces.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    disabled={status === "loading"}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 whitespace-nowrap transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>

                {message && (
                  <div
                    className={`mt-4 flex items-center justify-center gap-2 text-sm p-3 rounded-lg ${
                      status === "success"
                        ? "text-green-400 bg-green-500/10 border border-green-500/20"
                        : "text-red-400 bg-red-500/10 border border-red-500/20"
                    }`}
                  >
                    {status === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message}
                  </div>
                )}
              </form>

              <div className="mt-8 flex items-center justify-center space-x-8 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>Weekly Art Drops</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  <span>Exclusive Previews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>No Spam Ever</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
