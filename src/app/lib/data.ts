//Move database logic here
import dbConnect from "./dbConnect";
import { auth } from "@clerk/nextjs";
import userModel from "./models/userModel";
import { bookType } from "../types";

export async function getUserInfo() {
  await dbConnect();

  const { userId } = auth(); //retrieves userId from clerk

  //search the database for that user
  //if that user exists, return the data for it
  const data = await userModel.findOne({ authId: userId }).exec();

  if (data) {
    return data;
  }

  //This section might need to be updated later when migrating to NextAuth
  //if the user doesn't exist, create a new user in the database and then return the data
  const newUser = new userModel({ authId: userId });
  await newUser.save();
  const newData = await userModel.findOne({ authId: userId }).exec();
  return newData;
};

export async function getBookList() {

  const { booklist } = await getUserInfo();
  
  return booklist;
}

export async function getBook(id: string) {
  const booklist = await getBookList();

  return booklist.find((el: bookType) => el.id == id); //change booklist to bookList
}