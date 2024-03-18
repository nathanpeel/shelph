import React from "react";
import Book from "./Book";
import { bookType } from "../types";
import { getBookList } from "../lib/data";

const BookList = async () => {
  const bookList = await getBookList();

  return (
    <div className="my-10 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]">
      {bookList.map((item: bookType) => {
        const { id } = item;
        //pass the id into the book here
        return <Book key={crypto.randomUUID()} id={id} item={item} />;
      })}
    </div>
  );
};

export default BookList;
