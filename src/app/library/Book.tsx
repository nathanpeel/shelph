/**
 * Creates a book component to display in the book list
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stars from "@/app/library/Stars";
import { bookType } from "../types";

/**
 *
 * @param id id of the book for creating the dynamic route link
 * @param item the actually book data
 * @returns
 */
export default function Book({ id, item }: { id: string; item: bookType }) {
  const { rating, image, title, author, currentPageCount, totalPageCount } =
    item;

  return (
    <Link href={`/library/${id}`}>
      <div className="w-[90vw] h-[35vw] lg:w-[950px] lg:h-[370px] xl:w-[1150px] xl:h-[470px]">
        <div className="flex w-[100%] h-[100%] sm:gap-10 gap-5">
          <div className="relative bg-gray w-[25%] h-[100%] rounded-xl">
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
          <div className="flex flex-col justify-between sm:pb-10 pb-3">
            <div className="flex flex-col sm:gap-5 gap-1">
              <h2 className="text-2xl sm:text-4xl font-bold">{title}</h2>
              <p>by {author}</p>
              <Stars number={rating} />
            </div>
            {`${Math.floor(
              (currentPageCount / totalPageCount) * 100
            )}% Complete`}
          </div>
        </div>

        <div className="rounded-full bg-gradient-to-br from-pink to-orange w-[100%] sm:h-3 h-2 sm:mt-5 mt-2"></div>
      </div>
    </Link>
  );
}
