"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import QueryPanel from "@/components/query-panel"
import ResultsPanel from "@/components/results-panel"

export default function Dashboard() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
          <h1 className="text-xl font-semibold">Gen AI Analytics Dashboard</h1>
        </header>
        <div className="flex flex-col flex-1 overflow-hidden">
          <QueryPanel />
          <ResultsPanel />
        </div>
      </div>
    </Provider>
  )
}

