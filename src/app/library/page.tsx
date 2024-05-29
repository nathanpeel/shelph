/**
 * Route for the library tab which contains the book list
 */

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Book from "./Book";
import { getBookList } from "../lib/data";
import { bookType } from "../types";

/**
 * @async
 * @returns JSX Element
 */
export default async function Page() {
  const bookList = await getBookList();

  return (
    <div>
      <Navbar current="Your Library" />
      <div className="flex flex-col items-center">
        <h1 className="text-green sm:text-5xl font-bold text-3xl mb-10">
          Your Books
        </h1>
        <Link
          href="/library/new-item"
          className="rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold">
          New Book
        </Link>
        <div className="my-20 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]">
          {bookList.map((item: bookType) => {
            const { id } = item;
            return <Book key={crypto.randomUUID()} id={id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
