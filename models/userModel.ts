import mongoose from "mongoose";
import { bookSchema, BookType } from "./bookModel";

export interface UserType extends mongoose.Document {
  authId: string,
  booklist: BookType[],
  categories: string[],
  series: string[],
  stats: {
    pagesRead: number,
    booksRead: number,
    highestRated: string[]
  }
}

const userDataSchema = new mongoose.Schema<UserType>({
  authId: String,
  booklist: [bookSchema],
  categories: [String],
  series: [String],
  stats: {
    pagesRead: Number,
    booksRead: Number,
    highestRated: [String]
  }
})

export default mongoose.models.User || mongoose.model('User', userDataSchema);