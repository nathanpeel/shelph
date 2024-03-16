import mongoose from "mongoose";

export interface BookType extends mongoose.Document {
  title: string,
  author: string,
  image: string,
  rating: number,
  startDate: string,
  finishDate: string,
  currentPageCount: Number,
  totalPageCount: number,
  categories: string[],
  series: string
}

export const bookSchema = new mongoose.Schema<BookType>({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    minLength: [1, 'Title must have a length of at least 1']
  },
  image: String,
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


export default mongoose.models.Book || mongoose.model('Book', bookSchema);