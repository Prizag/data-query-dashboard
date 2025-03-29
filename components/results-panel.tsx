"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { Loader2 } from "lucide-react"

export default function ResultsPanel() {
  const { currentQuery, isLoading, error, results } = useSelector((state: RootState) => state.queries)

  if (!currentQuery && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-semibold mb-2">No query results yet</h3>
          <p className="text-muted-foreground">Ask a question about your data to see insights and visualizations</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Analyzing your data...</h3>
        <p className="text-muted-foreground max-w-md text-center">Our AI is processing your query: "{currentQuery}"</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-semibold mb-2 text-destructive">Error processing query</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm">Try rephrasing your question or check if the data you're asking about is available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Results for: {currentQuery}</h2>
          <p className="text-muted-foreground">Here are the insights based on your query</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            {results?.chartType === "bar" && <BarChart data={results.data} />}
            {results?.chartType === "line" && <LineChart data={results.data} />}
            {results?.chartType === "pie" && <PieChart data={results.data} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

