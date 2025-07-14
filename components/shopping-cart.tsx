"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Wallet, Smartphone } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  title: string
  price: number
  format: string
  image: string
  quantity: number
}

interface ShoppingCartProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("ethereal-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ethereal-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id && cartItem.format === item.format)

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id && cartItem.format === item.format
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })

    // Show success feedback
    setIsOpen(true)
  }

  const updateQuantity = (id: number, format: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, format)
      return
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id && item.format === format ? { ...item, quantity } : item)),
    )
  }

  const removeFromCart = (id: number, format: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.format === format)))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const contextValue = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white hover:from-purple-700 hover:to-pink-700 shadow-lg transform hover:scale-110 transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-slate-900/95 backdrop-blur-md border-white/10 w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({getTotalItems()})
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">Your cart is empty</p>
                <p className="text-white/50 text-sm">Add some ethereal art to get started</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.format}`}
                  className="flex items-center space-x-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={item.image || "/placeholder.svg?height=60&width=60"}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    <p className="text-white/60 text-xs">{item.format}</p>
                    <p className="text-purple-400 font-medium">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/10 hover:scale-110 transition-all"
                      onClick={() => updateQuantity(item.id, item.format, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-white w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/10 hover:scale-110 transition-all"
                      onClick={() => updateQuantity(item.id, item.format, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:scale-110 transition-all"
                      onClick={() => removeFromCart(item.id, item.format)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold text-white">
                <span>Total:</span>
                <span className="text-purple-400">${getTotalPrice()}</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-white font-medium text-sm">Payment Methods</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-purple-500/30">
                    <CreditCard className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                    <span className="text-white/80 text-xs">Card</span>
                  </button>
                  <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-purple-500/30">
                    <Wallet className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                    <span className="text-white/80 text-xs">PayPal</span>
                  </button>
                  <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-purple-500/30">
                    <Smartphone className="h-5 w-5 text-green-400 mx-auto mb-1" />
                    <span className="text-white/80 text-xs">Digital</span>
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
                onClick={() => alert("Secure checkout would be implemented here with Stripe/PayPal integration!")}
              >
                Secure Checkout
              </Button>

              <div className="flex items-center justify-center gap-4 text-white/50 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </CartContext.Provider>
  )
}

import { createContext, useContext } from "react"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  updateQuantity: (id: number, format: string, quantity: number) => void
  removeFromCart: (id: number, format: string) => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
