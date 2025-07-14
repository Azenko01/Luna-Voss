"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Palette, Sparkles, Mail, Instagram, Send, Play, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EnhancedGallery } from "@/components/enhanced-gallery"
import { Testimonials } from "@/components/testimonials"
import { ProcessShowcase } from "@/components/process-showcase"
import { ArtistJournal } from "@/components/artist-journal"
import { MobileNav } from "@/components/mobile-nav"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ShoppingCartProvider } from "@/components/shopping-cart"
import { ServiceDetailsModal } from "@/components/service-details-modal"

export default function EtherealGallery() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<"custom" | "character" | "direction" | null>(null)

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [contactMessage, setContactMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus("error")
      setContactMessage("Please fill in all fields.")
      setTimeout(() => {
        setContactStatus("idle")
        setContactMessage("")
      }, 3000)
      return
    }

    setContactStatus("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setContactStatus("success")
    setContactMessage("🎨 Thank you! Your message has been sent successfully. I'll get back to you within 24 hours!")
    setContactForm({ name: "", email: "", message: "" })

    setTimeout(() => {
      setContactStatus("idle")
      setContactMessage("")
    }, 5000)
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ShoppingCartProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Luna Voss
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#gallery" className="text-white/80 hover:text-purple-400 transition-colors">
                  Gallery
                </Link>
                <Link href="#about" className="text-white/80 hover:text-purple-400 transition-colors">
                  About
                </Link>
                <Link href="#services" className="text-white/80 hover:text-purple-400 transition-colors">
                  Services
                </Link>
                <Link href="#contact" className="text-white/80 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </div>
              <MobileNav />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="absolute inset-0">
            <div
              className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"
              style={{ transform: `translateY(${scrollY * 0.4}px)` }}
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Digital Artist & Visionary
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ethereal Dreams
              <br />
              <span className="text-4xl md:text-6xl">Made Digital</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
              Where imagination meets pixels, and dreams become reality through the art of digital creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 transition-all duration-200"
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Palette className="mr-2 h-5 w-5" />
                Explore Gallery
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Process
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Gallery */}
        <section id="gallery" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Artworks
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                A curated collection of ethereal digital masterpieces that blur the line between dreams and reality
              </p>
            </div>
            <EnhancedGallery />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-pink-500/20 text-pink-300 border-pink-500/30">About the Artist</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Luna Voss
                </h2>
                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                  A visionary digital artist who transforms the intangible realm of dreams into stunning visual
                  narratives. With over 8 years of experience in digital art, Luna specializes in creating ethereal
                  compositions that evoke emotion and wonder.
                </p>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Her work has been featured in numerous digital galleries and has garnered recognition from art
                  communities worldwide. Each piece is a journey into the sublime, where technology meets artistry.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">500+</div>
                    <div className="text-white/60 text-sm">Artworks Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">50k+</div>
                    <div className="text-white/60 text-sm">Happy Collectors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">8</div>
                    <div className="text-white/60 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Luna%20Voss.jpg-P3LKKFcYDYeDqNujvy6eu7x6EzPIzN.jpeg"
                  alt="Luna Voss - Digital Artist"
                  width={400}
                  height={500}
                  className="relative rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Creative Services
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Bringing your visions to life through bespoke digital artistry and creative collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Palette className="h-8 w-8" />,
                  title: "Custom Digital Art",
                  description:
                    "Personalized digital paintings and illustrations tailored to your vision and style preferences.",
                  price: "Starting at $299",
                  serviceType: "custom" as const,
                },
                {
                  icon: <Star className="h-8 w-8" />,
                  title: "Character Design",
                  description: "Unique character concepts and designs for games, stories, or personal projects.",
                  price: "Starting at $499",
                  serviceType: "character" as const,
                },
                {
                  icon: <Sparkles className="h-8 w-8" />,
                  title: "Art Direction",
                  description: "Creative consultation and art direction for digital projects and creative campaigns.",
                  price: "Starting at $199/hour",
                  serviceType: "direction" as const,
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-purple-400">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">{service.description}</p>
                    <div className="text-purple-400 font-medium mb-4">{service.price}</div>
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent transform hover:scale-105 transition-all duration-200"
                      onClick={() => {
                        setSelectedService(service.serviceType)
                        setServiceModalOpen(true)
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Showcase */}
        <ProcessShowcase />

        {/* Testimonials */}
        <Testimonials />

        {/* Artist Journal */}
        <ArtistJournal />

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Create Together
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Ready to bring your vision to life? Get in touch and let's discuss your next digital masterpiece.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-white/70">azenko0609@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Instagram</div>
                      <a
                        href="https://www.instagram.com/sa_sha698d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-pink-400 transition-colors"
                      >
                        @sa_sha698d
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Send className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Telegram</div>
                      <a
                        href="https://t.me/OleksandrA0101"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-blue-400 transition-colors"
                      >
                        @OleksandrA0101
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        disabled={contactStatus === "loading"}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        disabled={contactStatus === "loading"}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        disabled={contactStatus === "loading"}
                        required
                      />
                    </div>

                    {contactMessage && (
                      <div
                        className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
                          contactStatus === "success"
                            ? "text-green-400 bg-green-500/10 border border-green-500/20"
                            : "text-red-400 bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {contactStatus === "success" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        {contactMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={contactStatus === "loading"}
                    >
                      {contactStatus === "loading" ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Sparkles className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Luna Voss
                </span>
              </div>
              <div className="text-white/60 text-center md:text-right">
                <p>&copy; 2024 Luna Voss. All rights reserved.</p>
                <p className="text-sm mt-1">Crafting digital dreams, one pixel at a time.</p>
              </div>
            </div>
          </div>
        </footer>

        <ServiceDetailsModal
          isOpen={serviceModalOpen}
          onClose={() => {
            setServiceModalOpen(false)
            setSelectedService(null)
          }}
          serviceType={selectedService}
        />
      </div>
    </ShoppingCartProvider>
  )
}
