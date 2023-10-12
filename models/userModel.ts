import mongoose from "mongoose";
import { bookSchema } from "./bookModel";

const userDataSchema = new mongoose.Schema({
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