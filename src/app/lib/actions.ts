"use server";

/**
 * Server-side action to handle form validation and database operation for mutating data.
 * 
 * @module action
 */

import dbConnect from "./dbConnect";
import { z } from 'zod';
import BookModel from "./models/bookModel";
import UserData from "./models/userModel";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Defines the expected from data structure using Zod.
 */
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


/**
 * Type definition for the validation state.
 */
export type State = {
  errors?: {
    title?: string[];
    author?: string[];
    totalPageCount?: string[]
  };
  message?: string | null;
}

/**
 * Creates a new book entry in the database after validating the form data.
 *
 * @async
 * @function createBook
 * @param prevState The previous validation state.
 * @param formData The form data to be validated and processed.
 * @returns The result of the validation and database operation.
 */
export async function createBook(prevState: State, formData: FormData) {

  // Validate the form fields to ensure proper data types.
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

  // Check if the form data is valid and return errors if it's not.
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

  // Submit data to the database.
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

    if (!data) throw new Error('Could not find user when trying to add a book');

    const newBookList = [...data.bookList, book];
    await UserData.findOneAndUpdate({ _id: data._id }, { bookList: newBookList })
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Book"
    }
  }

  // Revalidate the library path and redirect to it.
  revalidatePath('/library');
  redirect('/library');
}

// add a general update function

// add an update rating function
export async function updateRating(newRating: number, id: string) {
  const { userId: authId } = auth();
  
  try {
    await dbConnect();

    const data = await UserData.findOne({ authId, });
    if (!data) throw new Error('Could not find user when trying to update a book rating');

    await UserData.findOneAndUpdate({ _id: data._id }, { $set: { 'bookList.$[element].rating': newRating } }, { arrayFilters: [{ 'element._id': id }] })
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Rating."
    }
  }

   // Revalidate the library path to reflect the change on the list
  revalidatePath('/library');
}


// add a delete function