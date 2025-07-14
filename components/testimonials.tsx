"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Art Collector",
    emoji: "👩‍🎨",
    rating: 5,
    text: "Luna's work transcends the digital medium. Each piece tells a story that resonates deeply with the soul. Her 'Cosmic Reverie' series has become the centerpiece of my collection.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Game Developer",
    emoji: "👨‍💻",
    rating: 5,
    text: "Working with Luna on our game's concept art was transformative. Her ability to visualize our abstract ideas into stunning visuals exceeded all expectations.",
  },
  {
    name: "Elena Vasquez",
    role: "Interior Designer",
    emoji: "👩‍🏭",
    rating: 5,
    text: "Luna's ethereal landscapes have transformed multiple client spaces. The way her art interacts with light and space is simply magical.",
  },
  {
    name: "David Kim",
    role: "Tech Entrepreneur",
    emoji: "👨‍💼",
    rating: 5,
    text: "The custom piece Luna created for our office lobby has become a conversation starter. Her professionalism and artistic vision are unmatched.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            What Collectors Say
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover why art enthusiasts and collectors worldwide choose Luna's ethereal creations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-white/90 text-lg leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-2xl">
                          {testimonial.emoji}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-white/60 text-sm">{testimonial.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
