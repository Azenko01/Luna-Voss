"use client"

import { useState, useMemo } from "react"
import { GalleryLightbox } from "./gallery-lightbox"
import { GalleryFilters } from "./gallery-filters"

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
      "https://images.unsplash.com/photo-1682687220757-c42e35a8a935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1703442494354-62495ba95a7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1703481424744-a4c36381069a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1703454425129-a0a594947893?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1703453559193-4c0a3910349a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1703453559291-44907e15951f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function EnhancedGallery() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    priceRange: "All Prices",
    sort: "Featured",
  })

  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          artwork.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Category filter
    if (filters.category !== "All Categories") {
      filtered = filtered.filter((artwork) => artwork.category === filters.category)
    }

    // Price range filter
    if (filters.priceRange !== "All Prices") {
      filtered = filtered.filter((artwork) => {
        const price = Number.parseInt(artwork.price.replace("$", ""))
        switch (filters.priceRange) {
          case "$0 - $300":
            return price <= 300
          case "$300 - $500":
            return price > 300 && price <= 500
          case "$500 - $700":
            return price > 500 && price <= 700
          case "$700+":
            return price > 700
          default:
            return true
        }
      })
    }

    // Sort
    switch (filters.sort) {
      case "Price: Low to High":
        filtered.sort((a, b) => Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", "")))
        break
      case "Price: High to Low":
        filtered.sort((a, b) => Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", "")))
        break
      case "Newest First":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "Most Popular":
        // Simulate popularity based on id (lower id = more popular)
        filtered.sort((a, b) => a.id - b.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [filters])

  return (
    <div>
      <GalleryFilters
        onSearchChange={(search) => setFilters((prev) => ({ ...prev, search }))}
        onCategoryChange={(category) => setFilters((prev) => ({ ...prev, category }))}
        onPriceRangeChange={(priceRange) => setFilters((prev) => ({ ...prev, priceRange }))}
        onSortChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
        activeFilters={filters}
      />

      {filteredArtworks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-white/50 text-lg mb-2">No artworks found</div>
          <div className="text-white/30">Try adjusting your filters</div>
        </div>
      ) : (
        <GalleryLightbox artworks={filteredArtworks} />
      )}

      <div className="text-center mt-8 text-white/60">
        Showing {filteredArtworks.length} of {artworks.length} artworks
      </div>
    </div>
  )
}
