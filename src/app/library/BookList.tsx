'use client'
import React from 'react'
import Book from '@/components/book';
import {
  loadBooks,
  loadSeries,
} from "../../../lib/redux/slices/userLibrarySlice";
import { loadCategories} from '../../../lib/redux/slices/newBookSlice';
import { useAppDispatch, useAppSelector} from '../../../lib/redux/hooks';

const BookList = () => {
  const dispatch = useAppDispatch();
  //request data here -- Using mock data for now
  dispatch(loadBooks([{bookId: 'sadfsdf'}, {bookId: 'asdfdsaf'}]));
  dispatch(loadCategories(["Summer reading", "Sci-Fi", "BookTube Recs"]));
  dispatch(loadSeries(["Berserk", "Monster", "The Lord of The Rings"]));
  const booksObject = useAppSelector(state => state.userLibrary.books);

  return (
    <section className="my-10 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]">
      {Object.keys(booksObject).map((id) => (
        <Book key={crypto.randomUUID()}/>
      ))}
    </section>
  );
}

export default BookList