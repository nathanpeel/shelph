import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@/app/types";

const initialState: {
  books: {
    [key: string]: Book
  },
  categories: string[],
  series: string[]
} = {
  books: {},
  categories: [],
  series: []
};


export const userLibrarySlice = createSlice({
  name: 'userLibrary',
  initialState,
  reducers: {
    loadBooks: (state, action) => {
      console.log('loading books!')
      const loadedBooks: {
        [key: string]: Book
      } = {};
      action.payload.forEach((el: Book) => {
        loadedBooks[el._id] = el;
      })
      state.books = loadedBooks;
    },

    loadCategories: (state, action) => {
      console.log('loading categories!')
      const loadedCats: string[] = [];
      action.payload.forEach((el: string) => {
        loadedCats.push(el);
      })
      state.categories = loadedCats;
    },

    loadSeries: (state, action) => {
      console.log('loading series!')
      const loadedSeries: string[] = [];
      action.payload.forEach((el: string) => {
        loadedSeries.push(el);
      })
      state.series = loadedSeries;
    }
  },
});

export const {loadBooks, loadCategories, loadSeries} = userLibrarySlice.actions;

export default userLibrarySlice.reducer;