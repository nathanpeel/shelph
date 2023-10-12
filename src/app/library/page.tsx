import Navbar from "@/components/navbar";
import NewBookButton from "./NewBookButton";
import BookList from "./BookList";
import { ReactElement } from "react";




const Library = (): ReactElement => {

  return (
    <div>
      <Navbar current="Your Library" />
      <div className="flex flex-col items-center">
        <h1 className="text-green sm:text-5xl font-bold text-3xl">
          Your Books
        </h1>
        <h2 className="sm:text-2xl text-lg font-semibold my-4 sm:my-8">
          Books read: 0
        </h2>
        <NewBookButton />
        <BookList />
      </div>
    </div>
  );
};

export default Library;
