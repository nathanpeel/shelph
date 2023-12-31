import React, { ReactElement } from "react";
import Image from "next/image";
import { useAppSelector } from "../../lib/redux/hooks";

const Book = ({id}: {id: string}): ReactElement => {
  const bookInfo = useAppSelector(state => state.userLibrary.books[id]);
  const {title, author, rating: stars, image, totalPageCount, currentPageCount} = bookInfo

  const starsArray: ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div className="relative md:w-8 md:h-8 w-5 h-5">
        <Image
          src={i < stars ? "/star.svg" : "/emptyStar.svg"}
          fill
          alt="star"
          sizes=""
        />
      </div>
    );
  }

  return (
    <div
      className="w-[90vw] h-[35vw] lg:w-[950px] lg:h-[370px] xl:w-[1150px] xl:h-[470px]"
      key={crypto.randomUUID()}>
      
      <div className="flex w-[100%] h-[100%] gap-10">
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
            <div className="flex gap-3">{starsArray}</div>
          </div>
          {`${Math.floor((currentPageCount / totalPageCount) * 100)}% Complete`}
        </div>
      </div>

      <div className="rounded-full bg-gradient-to-br from-pink to-orange w-[100%] h-3 sm:mt-5 mt-2"></div>
    </div>
  );
};

export default Book;
