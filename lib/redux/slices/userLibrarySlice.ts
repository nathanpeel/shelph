import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  books: {
    [key: string]: any
  },
  categories: string[],
  series: string[]
} = {
  books: {},
  categories: [],
  series: []
};

//---UPDATE TYPES IN THIS FILE. DO NOT USE TYPE ANY---//

export const userLibrarySlice = createSlice({
  name: 'userLibrary',
  initialState,
  reducers: {
    loadBooks: (state, action) => {
      console.log('loading books!')
      const loadedBooks: {
        [key: string]: any
      } = {};
      action.payload.forEach((el: any) => {
        loadedBooks[el.bookId] = el;
      })
      state.books = loadedBooks;
    },
    loadCategories: (state, action) => {
      console.log('loading categories!')
      const loadedCats: any[] = [];
      action.payload.forEach((el: any) => {
        loadedCats.push(el);
      })
      state.categories = loadedCats;
    },
    loadSeries: (state, action) => {
      console.log('loading series!')
      const loadedSeries: any[] = [];
      action.payload.forEach((el: any) => {
        loadedSeries.push(el);
      })
      state.series = loadedSeries;
    }
  },
});

export const {loadBooks, loadCategories, loadSeries} = userLibrarySlice.actions;

export default userLibrarySlice.reducer;