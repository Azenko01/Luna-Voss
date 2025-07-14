"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Image from "next/image"
import { ArticleModal } from "./article-modal"
import { AllArticlesModal } from "./all-articles-modal"

const journalEntries = [
  {
    id: 1,
    title: "The Philosophy of Digital Dreams",
    excerpt:
      "Exploring the intersection between consciousness and digital art, and how technology can capture the essence of human dreams...",
    category: "Philosophy",
    date: "December 15, 2024",
    readTime: "5 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Philosophy%20of%20Digital%20Dreams.jpg-MFyR4qmEIch3KvpN7y599YyhMOnSFj.jpeg",
    featured: true,
    content: "Full article content would be here...",
  },
  {
    id: 2,
    title: "Color Theory in Ethereal Art",
    excerpt:
      "Understanding how color psychology influences the emotional impact of digital artwork and creates atmospheric depth...",
    category: "Technique",
    date: "December 10, 2024",
    readTime: "7 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20Theory%20in%20Ethereal%20Art.jpg-2GqTzPLF052bThYHucyQQoo0UNDegw.jpeg",
    featured: false,
    content: "Full article content would be here...",
  },
  {
    id: 3,
    title: "Behind 'Cosmic Reverie'",
    excerpt:
      "A deep dive into the creation process of one of my most beloved pieces, from initial concept to final render...",
    category: "Process",
    date: "December 5, 2024",
    readTime: "10 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Behind%20%27Cosmic%20Reverie%27.jpg-oiLqDni6R30lonRrn20UmKxwc1mR8j.jpeg",
    featured: false,
    content: "Full article content would be here...",
  },
  {
    id: 4,
    title: "The Future of Digital Art",
    excerpt:
      "My thoughts on emerging technologies like AI and VR, and how they're reshaping the landscape of digital creativity...",
    category: "Industry",
    date: "November 28, 2024",
    readTime: "6 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Future%20of%20Digital%20Art.jpg-3HfQpGl98SOB7vKD0LMtvyeVQQtT1S.jpeg",
    featured: false,
    content: "Full article content would be here...",
  },
]

export function ArtistJournal() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [showAllArticlesModal, setShowAllArticlesModal] = useState(false)

  const featuredEntry = journalEntries.find((entry) => entry.featured)
  const regularEntries = journalEntries.filter((entry) => !entry.featured)

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article)
    setShowArticleModal(true)
  }

  const handleArticleSelect = (articleId: number) => {
    const article = journalEntries.find((a) => a.id === articleId)
    if (article) {
      handleReadArticle(article)
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-pink-500/20 text-pink-300 border-pink-500/30">
            <BookOpen className="mr-2 h-4 w-4" />
            Artist's Journal
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Thoughts & Insights
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Dive into the mind behind the art - exploring techniques, philosophy, and the creative journey
          </p>
        </div>

        {/* Featured Article */}
        {featuredEntry && (
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 mb-12 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <Image
                  src={featuredEntry.image || "/placeholder.svg"}
                  alt={featuredEntry.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:hidden" />
                <Badge className="absolute top-4 left-4 bg-purple-500/80 text-white">Featured</Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {featuredEntry.category}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {featuredEntry.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{featuredEntry.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredEntry.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredEntry.readTime}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-fit bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => handleReadArticle(featuredEntry)}
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {regularEntries.map((entry) => (
            <Card
              key={entry.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={() => handleReadArticle(entry)}
            >
              <div className="relative">
                <Image
                  src={entry.image || "/placeholder.svg"}
                  alt={entry.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 left-4 bg-purple-500/80 text-white">{entry.category}</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {entry.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">{entry.excerpt}</p>
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{entry.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
            onClick={() => setShowAllArticlesModal(true)}
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <ArticleModal isOpen={showArticleModal} onClose={() => setShowArticleModal(false)} article={selectedArticle} />

        <AllArticlesModal
          isOpen={showAllArticlesModal}
          onClose={() => setShowAllArticlesModal(false)}
          onArticleSelect={handleArticleSelect}
        />
      </div>
    </section>
  )
}
