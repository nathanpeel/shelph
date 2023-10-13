import { NextResponse } from "next/server"
import Book from "../../../../models/bookModel";
import UserData from "../../../../models/userModel";
import dbConnect from "../../../../lib/dbConnect";
import { newBookForm } from "@/app/types";
import {auth} from '@clerk/nextjs'

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
    await dbConnect();

    const { authId, formData} = await request.json()

    const book = new Book({
      title: formData.title,
      author: formData.author,
      rating: `${formData.rating}`,
      startDate: formData.startDate,
      finishDate: formData.finishDate,
      image: formData.image,
      currentPageCount: `${formData.currentPageCount}`,
      totalPageCount: `${formData.totalPageCount}`,
      series: formData.series
    });
    const data = await UserData.findOne({ authId, });

    if (!data) throw new Error('Could not find user in POST in library/route.ts')

    const newBookList = [...data.booklist, book];
    await UserData.findOneAndUpdate({_id: data._id}, {booklist: newBookList})
  
    return NextResponse.json({"message": "success"}); 
  } catch (err) {
    return NextResponse.json({"message": `failurs: ${err}`}, {"status": 400})
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { userId } = auth();

    const userData = await UserData.findOne({ authId: userId }).exec();
    if (!userData.booklist) throw new Error('incorrect Id inputed inside library.route.ts - GET. The method for retireving the Id may need to be updated.')

    return NextResponse.json({"userData": userData})
  } catch (err) {
    return NextResponse.json({"message": `failurs: ${err}`}, {"status": 400})
  }
}