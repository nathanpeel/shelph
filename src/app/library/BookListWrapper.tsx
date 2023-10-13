'use client'
import React, { ReactElement} from 'react'
import {
  loadBooks,
  loadSeries,
  loadCategories
} from "../../../lib/redux/slices/userLibrarySlice";
import { useAppDispatch } from '../../../lib/redux/hooks';
import BookList from './BookList';

const BookListWrapper = (): ReactElement => {
  const dispatch = useAppDispatch();

  fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://shelph.vercel.app'}/api/library`)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
    })
    .then((data) => {
      const { booklist, categories, series } = data.userData;
      dispatch(loadBooks(booklist));
      dispatch(loadCategories(categories));
      dispatch(loadSeries(series));
    })
    .catch((err) => console.log(err))

  return (
    <section>
      <BookList/>
    </section>
  );
}

export default BookListWrapper;