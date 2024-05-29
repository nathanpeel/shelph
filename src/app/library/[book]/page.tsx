/**
 * This is a dynamic route for individual book pages
 */

import React, { ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getBook } from "@/app/lib/data";
import UpdateStars from "./UpdateStars";
import { bookType } from "@/app/types";


/**
 * @async
 * @param param this contains the id of the book under the property book
 * @returns JSX Element
 */
export default async function Page({ params }: { params: { book: string } }) {
  const { book } = params;
  const bookData: bookType = await getBook(book);
  const { title, author, currentPageCount, totalPageCount, image, rating } = bookData;

  return (
    <div>
      <Navbar current="" />
      <main className="flex flex-col gap-10 sm:px-20 px-5">
        <div className="mt-20">
          <div className="flex flex-col items-center">
            <h1 className="sm:text-7xl text-3xl text-green mb-3 font-extrabold">
              {title}
            </h1>
            <p>by {author}</p>
            <div className="relative bg-gray sm:w-[325px] sm:h-[500px] w-[225px] h-[350px] rounded-xl my-5">
              {image !== "" ? (
                <Image
                  className="rounded-xl object-cover overflow-hidden"
                  placeholder="empty"
                  alt={`Image of ${title} cover`}
                  src={image}
                  fill
                  sizes="1"
                  priority
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl">{`${Math.floor(
                (currentPageCount / totalPageCount) * 100
              )}% Complete`}</p>
              <UpdateStars number={rating} id={book} />
            </div>
          </div>
          <div className="rounded-full bg-gradient-to-br from-pink to-orange w-[100%] h-3 sm:mt-5 mt-2" />
        </div>

        <div className="flex flex-col items-center mb-10 text-lg">
          <h2 className="text-sky text-2xl font-semibold mb-3">
            Update Reading Progress
          </h2>
          <div className="flex gap-10 justify-between rounded-full shadow-lg py-3 px-7 border-2 border-gray items-center">
            <div className="flex gap-2 items-center">
              <p>Current Page</p>
              <p className="bg-gradient-to-br from-pink to-orange bg-clip-text text-transparent text-2xl font-bold">
                {currentPageCount}
              </p>
            </div>
            <div>
              <p>Updated</p>
              <div>{}</div>
            </div>
            <button>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
};
