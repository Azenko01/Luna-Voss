"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Palette, Layers, Sparkles, Eye } from "lucide-react"
import Image from "next/image"

const processSteps = [
  {
    step: "01",
    title: "Conceptualization",
    description:
      "Every masterpiece begins with a vision. I explore themes, emotions, and narratives that will guide the artistic journey.",
    icon: <Eye className="h-6 w-6" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Conceptualization.jpg-Qrhbq7UJ2fnk5rY9IvjGx3xkdaQMMo.jpeg",
    duration: "2-3 days",
  },
  {
    step: "02",
    title: "Sketching & Planning",
    description: "Rough sketches and composition studies help establish the foundation and flow of the final piece.",
    icon: <Palette className="h-6 w-6" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sketching%20Planning.jpg-eeETccTf4jUGdL1QyAGfmnexsZ0PTn.jpeg",
    duration: "1-2 days",
  },
  {
    step: "03",
    title: "Digital Painting",
    description:
      "Layer by layer, the vision comes to life through careful color selection, lighting, and texture work.",
    icon: <Layers className="h-6 w-6" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital%20Painting.jpg-kJjrAN6pMHP8X67RRQe62JsWuId8gI.jpeg",
    duration: "5-7 days",
  },
  {
    step: "04",
    title: "Final Enhancement",
    description:
      "The finishing touches that transform good art into extraordinary art - effects, atmosphere, and soul.",
    icon: <Sparkles className="h-6 w-6" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Final%20Enhancement.jpg-lV6CjNzmmashCiiojXvjAoHd3u5Kjx.jpeg",
    duration: "1-2 days",
  },
]

export function ProcessShowcase() {
  return (
    <section className="py-20 px-6 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">Behind the Magic</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The Creative Process
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the meticulous journey from initial concept to final masterpiece
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-purple-500/80 text-white">{step.duration}</Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl font-bold text-purple-400/50">{step.step}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 inline-block">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Watch the Magic Unfold</h3>
                  <p className="text-white/70 mb-4">See a complete artwork come to life in this time-lapse video</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Process Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
