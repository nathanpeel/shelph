import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    minLength: [1, 'Title must have a length of at least 1']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    minLength: [1, 'Author must have a length of at least 1']
  },
  rating: Number,
  startDate: String,
  finishDate: String,
  currentPageCount: Number,
  totalPageCount: {
    type: Number,
    required: [true, 'Total page count is required']
  },
  categories: [String],
  series: String
});


const Book = mongoose.model('Book', bookSchema);
export default mongoose.models.Book || Book;