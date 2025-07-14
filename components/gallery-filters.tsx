"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface FilterProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onPriceRangeChange: (range: string) => void
  onSortChange: (sort: string) => void
  activeFilters: {
    search: string
    category: string
    priceRange: string
    sort: string
  }
}

const categories = ["All Categories", "Digital Painting", "Abstract Art", "Character Design", "Environment Art"]

const priceRanges = ["All Prices", "$0 - $300", "$300 - $500", "$500 - $700", "$700+"]

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest First", "Most Popular"]

export function GalleryFilters({
  onSearchChange,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  activeFilters,
}: FilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const clearFilters = () => {
    onSearchChange("")
    onCategoryChange("All Categories")
    onPriceRangeChange("All Prices")
    onSortChange("Featured")
  }

  const hasActiveFilters =
    activeFilters.search ||
    activeFilters.category !== "All Categories" ||
    activeFilters.priceRange !== "All Prices" ||
    activeFilters.sort !== "Featured"

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          placeholder="Search artworks..."
          value={activeFilters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="border-white/30 text-white hover:bg-white/10 bg-transparent transform hover:scale-105 transition-all duration-200"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && <Badge className="ml-2 bg-purple-500 text-white text-xs animate-pulse">Active</Badge>}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-white/70 hover:text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
          >
            <X className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Category</label>
            <Select value={activeFilters.category} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Price Range</label>
            <Select value={activeFilters.priceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range} className="text-white hover:bg-white/10">
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Sort By</label>
            <Select value={activeFilters.sort} onValueChange={onSortChange}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-white hover:bg-white/10">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.search && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Search: "{activeFilters.search}"
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {activeFilters.category !== "All Categories" && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {activeFilters.category}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("All Categories")} />
            </Badge>
          )}
          {activeFilters.priceRange !== "All Prices" && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {activeFilters.priceRange}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onPriceRangeChange("All Prices")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
