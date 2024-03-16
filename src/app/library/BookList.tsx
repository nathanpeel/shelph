import React from "react";
import Book from "@/app/library/book";
import dbConnect from "../lib/dbConnect";
import { auth } from "@clerk/nextjs";
import userModel from "../lib/models/userModel";
import { Book as bookType} from "../types";

const getUserInfo = async () => {
  await dbConnect();

  const { userId } = auth();
  //search the database for that user
  //if that user exists, return the data for it
  const data = await userModel.findOne({ authId: userId }).exec();

  if (data) {
    return data;
  }

  //if the user doesn't exist, create a new user in the database and then return the data
  const newUser = new userModel({ authId: userId });
  await newUser.save();
  const newData = await userModel.findOne({ authId: userId }).exec();
  return newData;
};


const BookList = async () => {
  const data = await getUserInfo();
  const { booklist } = data;

  return (
    <div className="my-10 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]">
      {booklist.map((item: bookType) => {
        const { id } = item;
        //pass the id into the book here
        return <Book key={crypto.randomUUID()} id={id} item={item} />;
      })}
    </div>
  );
};

export default BookList;
