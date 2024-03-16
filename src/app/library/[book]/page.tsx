import React, { ReactElement } from "react";
import Navbar from "@/components/navbar";
import Book from "@/app/library/book";
import Image from "next/image";
import dbConnect from "@/app/lib/dbConnect";
import { auth } from "@clerk/nextjs";
import userModel from "@/app/lib/models/userModel";
import { Book as bookType } from "@/app/types";

const getBook = async (id: string) => {
  await dbConnect();

  const { userId } = auth();
  //search the database for that user
  //if that user exists, return the data for it
  const data = await userModel.findOne({ authId: userId }).exec();

  if (data) {
    return data.booklist.find((el: bookType) => el.id == id);
  }

  //if the user doesn't exist, create a new user in the database and then return the data
  // const newUser = new userModel({ authId: userId });
  // await newUser.save();
  // const newData = await userModel.findOne({ authId: userId }).exec();
  // return newData;
};

const Page = async ({ params }: { params: { book: string } }) => {
  const { book } = params;
  const bookData = await getBook(book);
  const {title, author, currentPageCount, totalPageCount, image} = bookData


  // const starsArray: ReactElement[] = [];
  // for (let i = 0; i < 5; i++) {
  //   starsArray
  //     .push
  //     <div
  //       className="relative md:w-8 md:h-8 w-5 h-5"
  //       onClick={() => {
  //         setStarState(i + 1);
  //       }}>
  //       <Image
  //         src={i < starState ? "/star.svg" : "/emptyStar.svg"}
  //         fill
  //         alt="star"
  //         sizes=""
  //       />
  //     </div>
  //     ();
  // }

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
            {/* <div className="flex gap-3 my-3">{starsArray}</div> */}
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
