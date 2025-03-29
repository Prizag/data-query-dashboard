"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { submitQuery } from "@/lib/features/queries/queriesSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

// Mock AI suggestions
const AI_SUGGESTIONS = [
  "Show me sales trends for the last quarter",
  "Compare revenue by region for this year vs last year",
  "What products had the highest growth rate?",
  "Analyze customer retention rates by segment",
  "Show me the correlation between marketing spend and sales",
]

export default function QueryPanel() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      dispatch(submitQuery(query))
      setQuery("")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <div className="p-6 border-b">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ask anything about your data</h2>
        <p className="text-muted-foreground mb-6">Use natural language to query your data and get instant insights</p>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="e.g., Show me sales trends for the last quarter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-4 pr-4 py-6 text-base"
              />
            </div>
            <Button type="submit" size="lg">
              <Send className="h-5 w-5 mr-2" />
              Ask
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mt-4">
          <p className="text-sm text-muted-foreground mr-2">Try asking:</p>
          {AI_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm px-3 py-1 bg-accent rounded-full hover:bg-accent/80"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

