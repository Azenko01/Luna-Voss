"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, Heart } from "lucide-react"
import Image from "next/image"

interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  content: string
}

interface ArticleModalProps {
  isOpen: boolean
  onClose: () => void
  article: Article | null
}

export function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  if (!article) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] bg-slate-900/95 backdrop-blur-md border-white/20 overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-2xl text-white flex-1">{article.title}</DialogTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{article.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-white/80 leading-relaxed space-y-4">
              <p className="text-lg">{article.excerpt}</p>

              <p>
                Digital art has evolved tremendously over the past decade, transforming from a niche medium into a
                mainstream form of artistic expression. As we stand at the intersection of technology and creativity, we
                witness unprecedented possibilities emerging in the digital realm.
              </p>

              <p>
                The integration of artificial intelligence, virtual reality, and blockchain technology has opened new
                avenues for artists to explore. These tools don't replace traditional artistic skills but rather amplify
                them, allowing creators to push boundaries that were previously unimaginable.
              </p>

              <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">The Creative Process</h3>

              <p>
                My approach to digital art combines traditional artistic principles with cutting-edge technology. Each
                piece begins with a concept, a feeling, or a vision that I want to bring to life. The digital medium
                allows for infinite experimentation and refinement.
              </p>

              <p>
                Color theory, composition, and lighting remain fundamental, but digital tools provide unprecedented
                control over these elements. Layers, blend modes, and digital brushes become extensions of the artist's
                imagination.
              </p>

              <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">Looking Forward</h3>

              <p>
                The future of digital art is bright and full of possibilities. As technology continues to advance, we'll
                see even more innovative ways to create, share, and experience art. The key is to embrace these tools
                while maintaining the human touch that makes art truly meaningful.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
