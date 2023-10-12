import mongoose from "mongoose";
import { bookSchema, BookType } from "./bookModel";

export interface UserType extends mongoose.Document {
  username: string,
  password: string,
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
  username: String,
  password: String,
  booklist: [bookSchema],
  categories: [String],
  series: [String],
  stats: {
    pagesRead: Number,
    booksRead: Number,
    highestRated: [String]
  }
})

const User = mongoose.model('Users', userDataSchema);

export default mongoose.models.User || User;