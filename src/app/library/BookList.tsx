import React from "react";
import Book from "@/components/book";
import { useAppSelector } from "../../../lib/redux/hooks";

const BookList = () => {
  const booksObject = useAppSelector((state) => {
    return state.userLibrary.books;
  });

  return (
    <div className="my-10 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]">
      {Object.keys(booksObject).map((id) => {
        //pass the id into the book here
        return <Book key={crypto.randomUUID()} id={id} />;
      })}
    </div>
  );
};

export default BookList;
