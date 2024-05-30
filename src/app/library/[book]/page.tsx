/**
 * This is a dynamic route for individual book pages
 */

import React, { ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getBook } from "@/app/lib/data";
import UpdateStars from "./UpdateStars";
import { bookType } from "@/app/types";
import UpdateProgress from "./UpdateProgress";
import DeleteEdit from "./DeleteEdit";


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
        <UpdateProgress currentPageCount={currentPageCount} totalPageCount={totalPageCount} id={book} />
        <DeleteEdit title={title} id={book} />
      </main>
    </div>
  );
};
