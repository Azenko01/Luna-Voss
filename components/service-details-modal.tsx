"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Palette, Star, Sparkles, Clock, CheckCircle, CreditCard, Wallet, Smartphone } from "lucide-react"

interface ServiceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  serviceType: "custom" | "character" | "direction" | null
}

const serviceDetails = {
  custom: {
    icon: <Palette className="h-8 w-8" />,
    title: "Custom Digital Art",
    price: "Starting at $299",
    description: "Personalized digital paintings and illustrations tailored to your vision and style preferences.",
    features: [
      "Unlimited revisions until perfect",
      "High-resolution files (300 DPI)",
      "Commercial usage rights included",
      "Multiple format delivery (PNG, JPG, PSD)",
      "Progress updates throughout creation",
      "Final artwork within 7-14 days",
    ],
    packages: [
      { name: "Basic", price: "$299", description: "Single character or simple composition", delivery: "7 days" },
      { name: "Standard", price: "$499", description: "Complex scene with multiple elements", delivery: "10 days" },
      { name: "Premium", price: "$799", description: "Highly detailed masterpiece with effects", delivery: "14 days" },
    ],
  },
  character: {
    icon: <Star className="h-8 w-8" />,
    title: "Character Design",
    price: "Starting at $499",
    description: "Unique character concepts and designs for games, stories, or personal projects.",
    features: [
      "Complete character sheet included",
      "Multiple pose variations",
      "Color palette guide",
      "Concept art and sketches",
      "Turnaround views available",
      "Style guide documentation",
    ],
    packages: [
      { name: "Concept", price: "$499", description: "Basic character design with 2 poses", delivery: "5 days" },
      { name: "Complete", price: "$799", description: "Full character sheet with 5 poses", delivery: "10 days" },
      { name: "Deluxe", price: "$1299", description: "Complete package + expressions + props", delivery: "14 days" },
    ],
  },
  direction: {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Art Direction",
    price: "Starting at $199/hour",
    description: "Creative consultation and art direction for digital projects and creative campaigns.",
    features: [
      "One-on-one consultation sessions",
      "Creative brief development",
      "Style guide creation",
      "Team collaboration support",
      "Project timeline planning",
      "Quality assurance reviews",
    ],
    packages: [
      { name: "Consultation", price: "$199/hr", description: "Single session creative guidance", delivery: "Same day" },
      {
        name: "Project Guide",
        price: "$999",
        description: "Complete project art direction (5 hours)",
        delivery: "3 days",
      },
      {
        name: "Campaign Direction",
        price: "$1999",
        description: "Full campaign oversight (10+ hours)",
        delivery: "1 week",
      },
    ],
  },
}

export function ServiceDetailsModal({ isOpen, onClose, serviceType }: ServiceDetailsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  if (!serviceType || !serviceDetails[serviceType]) return null

  const service = serviceDetails[serviceType]

  const handleGetStarted = (packageName: string) => {
    setSelectedPackage(packageName)
    setShowContactForm(true)
  }

  const handleSubmitProject = () => {
    setShowContactForm(false)
    setShowPayment(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] bg-slate-900/95 backdrop-blur-md border-white/20 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-white">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">{service.icon}</div>
            {service.title}
          </DialogTitle>
        </DialogHeader>

        {!showContactForm && !showPayment && (
          <div className="space-y-6">
            {/* Service Overview */}
            <div className="space-y-4">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{service.price}</Badge>
              <p className="text-white/70 text-lg leading-relaxed">{service.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Your Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.packages.map((pkg, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <h4 className="text-lg font-semibold text-white">{pkg.name}</h4>
                        <div className="text-2xl font-bold text-purple-400">{pkg.price}</div>
                        <p className="text-white/70 text-sm">{pkg.description}</p>
                        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.delivery}</span>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={() => handleGetStarted(pkg.name)}
                        >
                          Get Started
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {showContactForm && !showPayment && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">Project Details</h3>
              <p className="text-white/70">Tell us about your vision for the {selectedPackage} package</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmitProject()
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              <Input
                placeholder="Project Title"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <Textarea
                placeholder="Describe your project vision, style preferences, and any specific requirements..."
                rows={6}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                  onClick={() => setShowContactForm(false)}
                >
                  Back to Packages
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          </div>
        )}

        {showPayment && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">Secure Payment</h3>
              <p className="text-white/70">Choose your preferred payment method</p>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Credit Card</h4>
                  <p className="text-white/60 text-sm">Visa, Mastercard, Amex</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      MC
                    </div>
                    <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                      AMEX
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Wallet className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">PayPal</h4>
                  <p className="text-white/60 text-sm">Secure PayPal payment</p>
                  <div className="mt-4">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">PayPal</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Digital Wallet</h4>
                  <p className="text-white/60 text-sm">Apple Pay, Google Pay</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-8 h-5 bg-black rounded text-white text-xs flex items-center justify-center">
                      🍎
                    </div>
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                      G
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-4">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-white/80">
                    <span>
                      {service.title} - {selectedPackage} Package
                    </span>
                    <span>{service.packages.find((p) => p.name === selectedPackage)?.price}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Processing Fee</span>
                    <span>$0</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>{service.packages.find((p) => p.name === selectedPackage)?.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={() => setShowPayment(false)}
              >
                Back to Details
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  alert("Payment processing would be implemented here with Stripe/PayPal integration!")
                  onClose()
                }}
              >
                Complete Payment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
