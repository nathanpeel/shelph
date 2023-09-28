import { configureStore } from "@reduxjs/toolkit";
import newBookReducer from './slices/newBookSlice'

export const store = configureStore({
  reducer: {
    newBook: newBookReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch