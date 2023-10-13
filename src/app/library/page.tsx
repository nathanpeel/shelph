import Navbar from "@/components/navbar";
import NewBookButton from "./NewBookButton";
import BookListWrapper from "./BookListWrapper";
import { ReactElement, useEffect } from "react";
import { auth } from '@clerk/nextjs'
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import userModel from "../../../models/userModel";


const getUserInfo = async () => {
  await dbConnect();

  const { userId } = auth();
  console.log(userId);
  //search the database for that user
    //if that user exists, return the data for it
  const data = await userModel.findOne({ authId: userId }).exec()
  
  if (data) {
    return data;
  }

    //if the user doesn't exist, create a new user in the database and then return the data
    const newUser = new userModel({ authId: userId });
    await newUser.save();
    const newData = await userModel.findOne({ authId: userId }).exec();
    return newData
};

const Library = async () => {


  const data = await getUserInfo();
  console.log(data)


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
        <BookListWrapper />
      </div>
    </div>
  );
};

export default Library;
