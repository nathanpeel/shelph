import React, { ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getBook } from "@/app/lib/data";
import UpdateStars from "./UpdateStars";

const Page = async ({ params }: { params: { book: string } }) => {
  const { book } = params;
  const bookData = await getBook(book);
  const { title, author, currentPageCount, totalPageCount, image, rating } =
    bookData;

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
            <UpdateStars number={rating} />
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

export default Page;
