"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  className?: string
  debounceTime?: number
  initialValue?: string
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  onChange,
  className = "",
  debounceTime = 300,
  initialValue = "",
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Create a handler function that calls either onSearch or onChange
  const handleSearchChange = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value)
      }
      if (onChange) {
        onChange(value)
      }
    },
    [onSearch, onChange],
  )

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      handleSearchChange(searchTerm)
    }, debounceTime)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchTerm, handleSearchChange, debounceTime])

  const handleClear = () => {
    setSearchTerm("")
    handleSearchChange("")
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`pl-8 ${searchTerm && "pr-8"}`}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
