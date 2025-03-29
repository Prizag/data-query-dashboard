import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types
export interface QueryHistoryItem {
  id: string
  text: string
  timestamp: number
}

export interface SummaryStatItem {
  label: string
  value: string | number
}

export interface QueryResults {
  chartType: "bar" | "line" | "pie"
  data: any[]
  secondaryChart?: "bar" | "line"
  secondaryData?: any[]
  summaryStats: SummaryStatItem[]
  insights: string[]
  tableHeaders: string[]
  tableData: any[][]
}

export interface QueriesState {
  currentQuery: string | null
  history: QueryHistoryItem[]
  isLoading: boolean
  error: string | null
  results: QueryResults | null
}

// Mock data generator
const generateMockData = (query: string): QueryResults => {
  // Determine chart type based on query content
  let chartType: "bar" | "line" | "pie" = "bar"

  if (
    query.toLowerCase().includes("trend") ||
    query.toLowerCase().includes("over time") ||
    query.toLowerCase().includes("growth")
  ) {
    chartType = "line"
  } else if (
    query.toLowerCase().includes("distribution") ||
    query.toLowerCase().includes("breakdown") ||
    query.toLowerCase().includes("segment")
  ) {
    chartType = "pie"
  }

  // Generate mock data based on chart type
  let data = []
  let secondaryData = []
  let tableHeaders = ["Category", "Value", "Change (%)", "Status"]
  let tableData = []

  const categories = ["Product A", "Product B", "Product C", "Product D", "Product E"]
  const regions = ["North", "South", "East", "West", "Central"]

  if (chartType === "bar") {
    data = categories.map((cat) => ({
      name: cat,
      value: Math.floor(Math.random() * 1000) + 100,
    }))

    secondaryData = regions.map((region) => ({
      name: region,
      value: Math.floor(Math.random() * 800) + 200,
    }))

    tableData = categories.map((cat) => [
      cat,
      Math.floor(Math.random() * 1000) + 100,
      (Math.random() * 20 - 10).toFixed(1),
      Math.random() > 0.5 ? "Positive" : "Negative",
    ])
  } else if (chartType === "line") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    data = months.map((month) => ({
      name: month,
      value: Math.floor(Math.random() * 800) + 200,
    }))

    secondaryData = months.map((month) => ({
      name: month,
      value: Math.floor(Math.random() * 600) + 100,
    }))

    tableHeaders = ["Month", "Value", "Growth (%)", "Status"]
    tableData = months.map((month) => [
      month,
      Math.floor(Math.random() * 800) + 200,
      (Math.random() * 15 - 5).toFixed(1),
      Math.random() > 0.5 ? "Above Target" : "Below Target",
    ])
  } else if (chartType === "pie") {
    data = regions.map((region) => ({
      name: region,
      value: Math.floor(Math.random() * 500) + 100,
    }))

    secondaryData = categories.map((cat) => ({
      name: cat,
      value: Math.floor(Math.random() * 800) + 200,
    }))

    tableHeaders = ["Region", "Value", "Percentage (%)", "Status"]
    tableData = regions.map((region) => [
      region,
      Math.floor(Math.random() * 500) + 100,
      (Math.random() * 30 + 5).toFixed(1),
      Math.random() > 0.5 ? "Growing" : "Declining",
    ])
  }

  // Generate insights based on the query
  const insights = [
    `There's a ${Math.random() > 0.5 ? "positive" : "negative"} correlation between ${Math.random() > 0.5 ? "marketing spend" : "customer engagement"} and overall performance.`,
    `${categories[Math.floor(Math.random() * categories.length)]} shows the highest ${Math.random() > 0.5 ? "growth potential" : "profit margin"} among all categories.`,
    `The ${regions[Math.floor(Math.random() * regions.length)]} region consistently outperforms other regions by ${Math.floor(Math.random() * 20) + 10}%.`,
    `Based on current trends, we project a ${Math.random() > 0.5 ? "growth" : "decline"} of ${Math.floor(Math.random() * 15) + 5}% in the next quarter.`,
  ]

  // Generate summary statistics
  const summaryStats = [
    { label: "Total Value", value: `$${Math.floor(Math.random() * 1000000) + 500000}` },
    { label: "Average", value: Math.floor(Math.random() * 5000) + 1000 },
    { label: "Growth Rate", value: `${(Math.random() * 20 - 5).toFixed(1)}%` },
    { label: "Forecast Accuracy", value: `${Math.floor(Math.random() * 20) + 80}%` },
  ]

  return {
    chartType,
    data,
    secondaryChart: chartType === "pie" ? "bar" : "line",
    secondaryData,
    summaryStats,
    insights,
    tableHeaders,
    tableData,
  }
}

// Async thunk for query submission
export const submitQuery = createAsyncThunk("queries/submitQuery", async (query: string, { rejectWithValue }) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 10% chance of error for demo purposes
    if (Math.random() < 0.1) {
      throw new Error("Failed to process query. Please try again.")
    }

    // Generate mock results
    const results = generateMockData(query)

    return {
      query,
      results,
      id: Date.now().toString(),
      timestamp: Date.now(),
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

// Initial state
const initialState: QueriesState = {
  currentQuery: null,
  history: [],
  isLoading: false,
  error: null,
  results: null,
}

// Slice
const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.currentQuery = null
      state.results = null
      state.error = null
    },
    clearHistory: (state) => {
      state.history = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state, action) => {
        state.isLoading = true
        state.error = null
        state.currentQuery = action.meta.arg
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentQuery = action.payload.query
        state.results = action.payload.results

        // Add to history if not already present
        if (!state.history.some((item) => item.text === action.payload.query)) {
          state.history.unshift({
            id: action.payload.id,
            text: action.payload.query,
            timestamp: action.payload.timestamp,
          })

          // Keep only the last 10 queries
          if (state.history.length > 10) {
            state.history = state.history.slice(0, 10)
          }
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearResults, clearHistory } = queriesSlice.actions
export default queriesSlice.reducer

