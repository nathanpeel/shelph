import dbConnect from "./dbConnect";
import { auth } from "@clerk/nextjs";
import userModel from "./models/userModel";
import { bookType } from "../types";

/**
 * Retrieves the user's information from the database.
 *
 * If the user exists, returns the user's data. If not, creates a new user and returns the newly created data.
 *
 * @async
 * @function getUserInfo
 * @returns The user's data.
 */
export async function getUserInfo() {
  await dbConnect();

  const { userId } = auth(); // Retrieves userId from Clerk.

  // Search the database for the user.
  const data = await userModel.findOne({ authId: userId }).exec();

  if (data) {
    return data;
  }

  // If the user doesn't exist, create a new user in the database and return the data.
  // Note: This section might need to be updated later when migrating to NextAuth.
  const newUser = new userModel({ authId: userId });
  await newUser.save();
  const newData = await userModel.findOne({ authId: userId }).exec();
  return newData;
};

/**
 * Retrieves the user's book list from the database.
 *
 * @async
 * @function getBookList
 * @returns The user's book list.
 */
export async function getBookList() {
  const { bookList } = await getUserInfo();
  
  return bookList;
}

/**
 * Retrieves a specific book from the user's book list.
 *
 * @async
 * @function getBook
 * @param id The ID of the book to retrieve.
 * @returns The book with the specified ID, or undefined if not found.
 */
export async function getBook(id: string) {
  const bookList = await getBookList();

  return bookList.find((el: bookType) => el.id == id);
}