"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface AllArticlesModalProps {
  isOpen: boolean
  onClose: () => void
  onArticleSelect: (articleId: number) => void
}

const allArticles = [
  {
    id: 1,
    title: "The Philosophy of Digital Dreams",
    excerpt: "Exploring the intersection between consciousness and digital art...",
    category: "Philosophy",
    date: "December 15, 2024",
    readTime: "5 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Philosophy%20of%20Digital%20Dreams.jpg-MFyR4qmEIch3KvpN7y599YyhMOnSFj.jpeg",
  },
  {
    id: 2,
    title: "Color Theory in Ethereal Art",
    excerpt: "Understanding how color psychology influences emotional impact...",
    category: "Technique",
    date: "December 10, 2024",
    readTime: "7 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20Theory%20in%20Ethereal%20Art.jpg-2GqTzPLF052bThYHucyQQoo0UNDegw.jpeg",
  },
  {
    id: 3,
    title: "Behind 'Cosmic Reverie'",
    excerpt: "A deep dive into the creation process of one of my most beloved pieces...",
    category: "Process",
    date: "December 5, 2024",
    readTime: "10 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Behind%20%27Cosmic%20Reverie%27.jpg-oiLqDni6R30lonRrn20UmKxwc1mR8j.jpeg",
  },
  {
    id: 4,
    title: "The Future of Digital Art",
    excerpt: "My thoughts on emerging technologies like AI and VR...",
    category: "Industry",
    date: "November 28, 2024",
    readTime: "6 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Future%20of%20Digital%20Art.jpg-3HfQpGl98SOB7vKD0LMtvyeVQQtT1S.jpeg",
  },
  {
    id: 5,
    title: "Mastering Digital Brushwork",
    excerpt: "Advanced techniques for creating realistic textures in digital painting...",
    category: "Technique",
    date: "November 20, 2024",
    readTime: "8 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sketching%20Planning.jpg-eeETccTf4jUGdL1QyAGfmnexsZ0PTn.jpeg",
  },
  {
    id: 6,
    title: "The Art of Storytelling Through Visuals",
    excerpt: "How to convey narrative and emotion through digital compositions...",
    category: "Philosophy",
    date: "November 15, 2024",
    readTime: "6 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quantum%20Flux.jpg-sG3zMSW85mYwlvIqL9jQkjLAFIiapR.jpeg",
  },
]

export function AllArticlesModal({ isOpen, onClose, onArticleSelect }: AllArticlesModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Philosophy", "Technique", "Process", "Industry"]

  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] bg-slate-900/95 backdrop-blur-md border-white/20 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">All Articles</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-white/30 text-white hover:bg-white/10 bg-transparent"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  onArticleSelect(article.id)
                  onClose()
                }}
              >
                <div className="relative">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-500/80 text-white">{article.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-white/60 text-xs">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white/50 text-lg mb-2">No articles found</div>
              <div className="text-white/30">Try adjusting your search or filter</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
