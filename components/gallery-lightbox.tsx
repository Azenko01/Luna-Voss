"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "./shopping-cart"

interface Artwork {
  id: number
  title: string
  category: string
  price: string
  description: string
  dimensions: string
  year: string
  medium: string
  image: string
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Cosmic Reverie",
    category: "Digital Painting",
    price: "$299",
    description:
      "A mesmerizing journey through the cosmos, where stardust meets consciousness in an eternal dance of light and shadow.",
    dimensions: "3840 × 2160 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cosmic%20Reverie.jpg-0jxOBVvlYknZhUlWKarSiQJDDld8DT.jpeg",
  },
  {
    id: 2,
    title: "Neon Dreams",
    category: "Abstract Art",
    price: "$399",
    description:
      "Electric visions of a cyberpunk future, where neon lights paint stories of hope in the digital darkness.",
    dimensions: "4096 × 2304 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neon%20Dreams.jpg-SekLOiuBLkbAa22g7oe3ywmlcMhmoV.jpeg",
  },
  {
    id: 3,
    title: "Ethereal Portrait",
    category: "Character Design",
    price: "$499",
    description: "A haunting portrait that captures the essence of dreams made manifest in digital form.",
    dimensions: "2048 × 2048 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ethereal%20Portrait.jpg-WgeyS4DK9WkuNX6oNpOQTJKglSCc0j.jpeg",
  },
  {
    id: 4,
    title: "Mystic Landscape",
    category: "Environment Art",
    price: "$599",
    description: "An otherworldly landscape where reality bends and magic flows through every pixel.",
    dimensions: "5120 × 2880 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mystic%20Landscape.jpg-C2bFt8BUoObLcWEXB8UoKpkWlcOjTh.jpeg",
  },
  {
    id: 5,
    title: "Quantum Flux",
    category: "Abstract Art",
    price: "$349",
    description: "The visualization of quantum mechanics through artistic interpretation and digital mastery.",
    dimensions: "3840 × 2160 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quantum%20Flux.jpg-sG3zMSW85mYwlvIqL9jQkjLAFIiapR.jpeg",
  },
  {
    id: 6,
    title: "Celestial Dance",
    category: "Digital Painting",
    price: "$449",
    description: "Celestial bodies performing an eternal ballet across the canvas of space and time.",
    dimensions: "4096 × 2304 px",
    year: "2024",
    medium: "Digital Art",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Celestial%20Dance.jpg-6yehWDda7vUv3xtbvBupKT97amwHzt.jpeg",
  },
]

export function GalleryLightbox() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { addToCart } = useCart()

  const handleAddToCart = (format: string, additionalPrice = 0) => {
    if (!selectedArtwork) return

    addToCart({
      id: selectedArtwork.id,
      title: selectedArtwork.title,
      price: Number.parseInt(selectedArtwork.price.replace("$", "")) + additionalPrice,
      format,
      image: selectedArtwork.image,
    })
  }

  const openLightbox = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setCurrentIndex(artworks.findIndex((a) => a.id === artwork.id))
  }

  const closeLightbox = () => {
    setSelectedArtwork(null)
  }

  const nextArtwork = () => {
    const nextIndex = (currentIndex + 1) % artworks.length
    setCurrentIndex(nextIndex)
    setSelectedArtwork(artworks[nextIndex])
  }

  const prevArtwork = () => {
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length
    setCurrentIndex(prevIndex)
    setSelectedArtwork(artworks[prevIndex])
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, index) => (
          <div key={artwork.id} className="group cursor-pointer" onClick={() => openLightbox(artwork)}>
            <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="relative">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Badge className="bg-purple-500/80 text-white mb-2">{artwork.category}</Badge>
                  <p className="text-white/90 text-sm">{artwork.year}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {artwork.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-medium text-lg">{artwork.price}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedArtwork} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-black/95 border-white/20 p-0 overflow-hidden">
          {selectedArtwork && (
            <div className="flex h-full">
              {/* Image Section */}
              <div className="flex-1 relative flex items-center justify-center bg-black/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={prevArtwork}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={nextArtwork}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <Image
                  src={selectedArtwork.image || "/placeholder.svg"}
                  alt={selectedArtwork.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="w-96 bg-gradient-to-b from-slate-900 to-purple-900/50 p-8 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                      {selectedArtwork.category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedArtwork.title}</h2>
                    <p className="text-purple-400 text-xl font-medium">{selectedArtwork.price}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Description</h3>
                      <p className="text-white/70 leading-relaxed">{selectedArtwork.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="text-white font-medium">Dimensions</h4>
                        <p className="text-white/70">{selectedArtwork.dimensions}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Year</h4>
                        <p className="text-white/70">{selectedArtwork.year}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Medium</h4>
                        <p className="text-white/70">{selectedArtwork.medium}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Edition</h4>
                        <p className="text-white/70">Limited</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => handleAddToCart("Digital Download")}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3">Available Formats</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart("Digital Download")}
                        className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white/90">Digital Download</span>
                        <span className="text-purple-400">{selectedArtwork.price}</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart("Canvas Print", 150)}
                        className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white/90">Canvas Print</span>
                        <span className="text-purple-400">+$150</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart("Metal Print", 200)}
                        className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white/90">Metal Print</span>
                        <span className="text-purple-400">+$200</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
