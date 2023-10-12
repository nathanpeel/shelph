import { NextResponse } from "next/server"
import Book from "../../../../models/bookModel";
import UserData from "../../../../models/userModel";
import dbConnect from "../../../../lib/dbConnect";

// {
//   title: {
//     type: String,
//     required: [true, 'Book title is required'],
//     minLength: [1, 'Title must have a length of at least 1']
//   },
//   author: {
//     type: String,
//     required: [true, 'Author is required'],
//     minLength: [1, 'Author must have a length of at least 1']
//   },
//   rating: Number,
//   startDate: String,
//   finishDate: String,
//   currentPageCount: Number,
//   totalPageCount: {
//     type: Number,
//     required: [true, 'Total page count is required']
//   },
//   categories: [String],
//   series: String
// }


export async function POST(request: Request) {
  try {
    // const {title, author, rating, startDate, finishDate, currentPageCount, totalPageCount, categories, series} = await request.json();
    await dbConnect();
    const title = 'The Lord of The Rings', author = 'Miura'

    const book = new Book({ title, author, rating: 5, startDate: '1-2-23' });
    const data = await UserData.findOne({ username: 'banana' });

    if (!data) throw new Error('Could not find user in POST in library/route.ts')

    const newBookList = [...data.booklist, book];
    await UserData.findOneAndUpdate({_id: data._id}, {booklist: newBookList})
  
    return NextResponse.json({"message": "success"}); 
  } catch (err) {
    return NextResponse.json({"message": `failurs: ${err}`}, {"status": 400})
  }
}