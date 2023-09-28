import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { newBookForm } from "@/app/types";

const initialState: newBookForm = {
  title: "",
  author: "",
  series: "",
  category: {},
  rating: 0,
  totalPageCount: 0,
  currentPageCount: 0,
  startDate: '',
  finishDate: '',
};


export const newBookSlice = createSlice({
  name: 'newBook',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    updateSeries: (state, action: PayloadAction<string>) => {
      state.series = action.payload;
    },
    updateCateogry: (state, action: PayloadAction<string>) => {
      if (Object.hasOwn(state.category, action.payload)) {
        const value = state.category[action.payload];
        value ? state.category[action.payload] = false : state.category[action.payload] = true;
      }
    },
    loadCategories: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(cat => state.category[cat] = false);
    },
    updateRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    updateTotalPageCount: (state, action: PayloadAction<number>) => {
      state.totalPageCount = action.payload;
    },
    updateCurrentPageCount: (state, action: PayloadAction<number>) => {
      state.currentPageCount = action.payload;
    },
    updateStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    updateFinishDate: (state, action: PayloadAction<string>) => {
      state.finishDate = action.payload;
    },
    resetForm: (state) => {
      state.title = '';
      state.author = '';
      state.series = '';
      state.rating = 0;
      state.totalPageCount = 0;
      state.currentPageCount = 0;
      state.startDate = '';
      state.finishDate = '';
      Object.keys(state.category).forEach((key) => {
        state.category[key] = false;
      })
    }
  },
});

export const { updateTitle, updateAuthor, updateSeries, updateCateogry, loadCategories, updateRating, updateTotalPageCount, updateCurrentPageCount, updateStartDate, updateFinishDate, resetForm } = newBookSlice.actions;

export default newBookSlice.reducer;