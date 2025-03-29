import { configureStore } from "@reduxjs/toolkit"
import queriesReducer from "./features/queries/queriesSlice"

export const store = configureStore({
  reducer: {
    queries: queriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

