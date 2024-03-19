"use server";

import dbConnect from "./dbConnect";
import { z } from 'zod';
import BookModel from "./models/bookModel";
import UserData from "./models/userModel";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//this uses zod to create an expected data from the form
const FormSchema = z.object({
  title: z.string().min(1), // REQUIRED
  author: z.string().min(1), // REQUIRED
  image: z.string().optional(),
  rating: z.coerce.number().optional(),
  startDate: z.string().optional(),
  finishDate: z.string().optional(),
  totalPageCount: z.coerce.number().int().positive().gte(1), // REQUIRED
  currentPageCount: z.coerce.number().optional(),
  categories: z.string().optional().array().optional(),
  series: z.string().optional(),
})


//This is the validation state type
export type State = {
  errors?: {
    title?: string[];
    author?: string[];
    totalPageCount?: string[]
  };
  message?: string | null;
}

export async function createBook(prevState: State, formData: FormData) {

  //this validates the fields to ensure proper data types
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    image: formData.get('image') || '',
    rating: formData.get('rating') || 0,
    startDate: formData.get('startDate'),
    finishDate: formData.get('finishDate'),
    totalPageCount: formData.get('totalPageCount'),
    currentPageCount: formData.get('currentPageCount'),
    categories: formData.get('categories') || [],
    series: formData.get('series') || '',
  });
  //checks if the form data is valid and sends errors to the form if it is not.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or incorrect fields. Failed to create book'
    }
  }
  const {
    title,
    author,
    image, 
    rating, 
    startDate, 
    finishDate, 
    totalPageCount, 
    currentPageCount, 
    categories, 
    series
  } = validatedFields.data;

  const { userId: authId } = auth();

  //submit data to the database
  try {
    await dbConnect();

    const book = new BookModel({
      title: title,
      author: author,
      rating: rating,
      startDate: startDate,
      finishDate: finishDate,
      image: image,
      currentPageCount: currentPageCount,
      totalPageCount: totalPageCount,
      series: series,
      categories: categories
    });
    const data = await UserData.findOne({ authId, });

    if (!data) throw new Error('Could not find user when trying to add a book')

    const newBookList = [...data.booklist, book];
    await UserData.findOneAndUpdate({ _id: data._id }, { booklist: newBookList })
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Book"
    }
  }
  revalidatePath('/library');
  redirect('/library');

}

//add a general update function

//add an update rating function

//add an update rating function

//add a delete function