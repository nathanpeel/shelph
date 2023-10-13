import { configureStore } from "@reduxjs/toolkit";
import newBookReducer from './slices/newBookSlice'
import userLibraryReducer from './slices/userLibrarySlice'

export const store = configureStore({
  reducer: {
    newBook: newBookReducer,
    userLibrary: userLibraryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch