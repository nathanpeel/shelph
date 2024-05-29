import mongoose from "mongoose";
import { bookSchema, BookType } from "./bookModel";

/**
 * Defines user interface
 */
export interface UserType extends mongoose.Document {
  authId: string,
  bookList: BookType[],
  categories: string[],
  series: string[],
  stats: {
    pagesRead: number,
    booksRead: number,
    highestRated: string[]
  }
}

/**
 * Creates user schema
 */
const userDataSchema = new mongoose.Schema<UserType>({
  authId: String,
  bookList: [bookSchema],
  categories: [String],
  series: [String],
  stats: {
    pagesRead: Number,
    booksRead: Number,
    highestRated: [String]
  }
})

export default mongoose.models.User || mongoose.model('User', userDataSchema);