import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, { dbName: 'shelph' })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const bookSchema = new Schema({
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
export const Book = mongoose.model('Book', bookSchema);

const userDataSchema = new Schema({
  username: String,
  password: String,
  booklist: Book,
  categories: [String],
  series: [String],
  stats: {
    pagesRead: Number,
    booksRead: Number,
    highestRated: [String]
  }
})

const UserData = mongoose.model('UserData', userDataSchema);
export default UserData;