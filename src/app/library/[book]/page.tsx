"use client";
import React, {ReactElement, useState} from "react";
import { useAppSelector, useAppDispatch } from "../../../../lib/redux/hooks";
import Navbar from "@/components/navbar";
import Book from "@/components/book";
import Image from "next/image";

const Page = ({ params }: { params: { book: string } }) => {

  const { book } = params;

  const bookData = useAppSelector((state) => {
    return state.userLibrary.books[book];
  });

  const { title, author, image, currentPageCount, totalPageCount, rating } = bookData;

  const [starState, setStarState] = useState(rating);


  const starsArray: ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div className="relative md:w-8 md:h-8 w-5 h-5" onClick={() => {
        setStarState(i + 1)
      }}>
        <Image
          src={i < starState ? "/star.svg" : "/emptyStar.svg"}
          fill
          alt="star"
          sizes=""
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar current="" />
      <main className="flex flex-col gap-10  px-20">
        <div className="mt-20">
          <div className="flex flex-col items-center">
            <h1 className="text-7xl text-green mb-3 font-extrabold">{title}</h1>
            <p>by {author}</p>
            <div className="relative bg-gray w-[289px] h-[470px] rounded-xl my-5">
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
            <p className="text-3xl">{`${Math.floor(
              (currentPageCount / totalPageCount) * 100
            )}% Complete`}</p>
            <div className="flex gap-3 my-3">{starsArray}</div>
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
              <div>
                {}
              </div>
            </div>
            <button>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
