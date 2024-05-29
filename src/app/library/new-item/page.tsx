"use client";

/**
 * Route for form to add a new book
 */

import { useState } from "react";
import { useFormState } from "react-dom";
import { createBook } from "@/app/lib/actions";
import Link from "next/link";
import Image from "next/image";

/**
 * 
 * @returns JSX Element
 */
export default function Page() {
  const initialState = { message: null, errors: {} };
  // uses server action to add book when form is submitted
  const [state, dispatch] = useFormState(createBook, initialState);

  // determines if the image field is a imageUrl or a file
  const [useImageUrl, setUseImageUrl] = useState(false);
  const [rating, setRating] = useState(0);
  const starsArray = [];

  /**
   * Updates the stars and form data
   * 
   * @function handleClickStars
   * @param number the rating and number of filled in stars
   */
  function handleClickStars(number: number) {
    setRating(number);
    const ratingInput = document.getElementById("rating") as HTMLInputElement;
    if (ratingInput) {
      ratingInput.value = `${number}`;
    }
  }

  // Creates initial star state 
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div
        className="relative w-8 h-8"
        key={crypto.randomUUID()}
        onClick={(e) => {
          handleClickStars(i + 1);
        }}>
        <Image
          src={i < rating ? "/star.svg" : "/emptyStar.svg"}
          fill
          alt="star"
          sizes=""
        />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center py-10">
      <h1 className="text-3xl text-center">Enter the Book Details</h1>
      <p>
        Required fields are indicate by{" "}
        <span className="text-red-500">*</span>
      </p>
      <form
        action={dispatch}
        className="max-w-[1000px] w-full px-10"
        aria-describedby="form-error">
        {/* --- */}
        {/* TITLE */}
        <div className="my-8">
          <label className="text-lg" htmlFor="title">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-full h-10 border-gray"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic>
            {state.errors?.title && (
              <p className="mt-2 text-sm text-red-500">Please enter a title</p>
            )}
          </div>
        </div>

        {/* --- */}
        {/* AUTHOR */}
        <div className="my-8">
          <label className="text-lg" htmlFor="author">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
            aria-describedby="author-error"
          />
          <div id="author-error" aria-live="polite" aria-atomic>
            {state.errors?.author && (
              <p className="mt-2 text-sm text-red-500">
                Please enter an author
              </p>
            )}
          </div>
        </div>

        {/* --- */}
        {/* IMAGE */}
        <div key="images" className="flex flex-col items-start my-8">
          <div className="flex flex-col">
            {useImageUrl ? (
              <button
                className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  setUseImageUrl(false);
                }}>
                Upload Image Instead
              </button>
            ) : (
              <button
                className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  setUseImageUrl(true);
                }}>
                Use image Adress Instead
              </button>
            )}
          </div>

          {useImageUrl ? (
            <div>
              <label className="text-lg" htmlFor="image">
                Paste an image address
              </label>
              <input
                type="text"
                id="image"
                name="image"
                className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray border-solid"
              />
            </div>
          ) : (
            <div className="my-8 flex flex-col">
              <label className="text-lg" htmlFor="image">
                Upload an image
              </label>
              <input type="text" id="image" name="image" hidden />
              <input
                type="file"
                  onChange={(e) => {
                  /**
                   * Finds the file type of the inputted file
                   * example: .png, .jpeg. etc
                   * 
                   * @param fileName name of the image file
                   * @returns the file type
                   */
                  function getFileExtension(fileName: string): string {
                    if (!fileName) return "";

                    const string = fileName.split(".").pop();

                    if (string) return "." + string.toLowerCase();
                    return "";
                  }

                  // converts an image into a DataURL to store in the database
                  const input = e.target;
                  if (input.files) {
                    if (input.files.length > 0) {
                      const fileSize = input.files[0].size;
                      const fileName: string = input.files[0].name;
                      const validExtensions = [
                        ".jpg",
                        ".jpeg",
                        ".png",
                        ".webp",
                      ];

                      const maxFileSize = 500 * 500;

                      if (fileSize > maxFileSize) {
                        alert(
                          "Image is to large. Please select a smaller image or adjust the file size. "
                        );
                        e.target.value = "";
                        return;
                      }
                      if (
                        !validExtensions.includes(getFileExtension(fileName))
                      ) {
                        alert(
                          "Invalid file type. Please select a .jpg, .jpeg, .png, or .webp file"
                        );
                        e.target.value = "";
                        return;
                      }
                    }
                  }

                  if (input.files && input.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                      if (e.target) {
                        // sets the form data to the image URL
                        const dataUrl = e.target.result;
                        if (dataUrl) {
                          const newImage = dataUrl.toString();
                          const imageDataInput = document.getElementById(
                            "image"
                          ) as HTMLInputElement;
                          if (imageDataInput) {
                            imageDataInput.value = newImage;
                          }
                        }
                      }
                    };

                    reader.readAsDataURL(input.files[0]);
                  }
                }}
                className="file:hover:border-black file:focus:border-sky file:focus:outline-none file:border-2 file:shadow-lg file:rounded-xl sm:file:w-[60%] file:h-10 file:bg-white p-4 -mb-7 file:mr-3 underline text-sky file:border-gray file:border-solid -ml-4"
              />
            </div>
          )}
        </div>

        {/* --- */}
        {/* SERIES */}
        <div className="flex flex-col gap-1 my-8">
          <label className="text-lg" htmlFor="series">
            Select a series
          </label>
          <select className="border-2 border-gray rounded-full p-2">
            {/* Add options here */}
          </select>
        </div>

        {/* --- */}
        {/* CATEGORIES */}
        <div className="my-8">
          <label className="text-lg">Select categories</label>
          {/* Add checkboxes */}
        </div>

        {/* --- */}
        {/* RATING */}
        <div className="my-8">
          <label htmlFor="rating" className="text-lg">
            Rate the book
          </label>
          <input type="number" name="rating" id="rating" hidden />
          <div className="flex gap-3">{starsArray}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClickStars(0);
            }}
            className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4">
            No rating
          </button>
        </div>

        {/* --- */}
        {/* TOTAL PAGE COUNT */}
        <div className="my-8">
          <label className="text-lg" htmlFor="totalPageCount">
            Enter the book&apos;s total page count{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            accept="number"
            id="totalPageCount"
            name="totalPageCount"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
            aria-describedby="pageCount-error"
          />
          <div id="pageCount-error" aria-live="polite" aria-atomic>
            {state.errors?.totalPageCount && (
              <p className="mt-2 text-sm text-red-500">
                Please enter a total page count
              </p>
            )}
          </div>
        </div>

        {/* --- */}
        {/* CURRENT PAGE COUNT */}
        <div className="my-8">
          <label className="text-lg" htmlFor="currentPageCount">
            How many pages are you into this book?
          </label>
          <input
            type="number"
            accept="number"
            id="currentPageCount"
            name="currentPageCount"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
          />
        </div>

        {/* --- */}
        {/* START DATE */}
        <div className="my-8 flex flex-col">
          <label className="text-lg" htmlFor="startDate">
            Please select a start date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
          />
        </div>

        {/* --- */}
        {/* FINISH DATE */}
        <div className="my-8 flex flex-col">
          <label className="text-lg" htmlFor="finishDate">
            Please select a finish date if applicable
          </label>
          <input
            type="date"
            id="finishDate"
            name="finishDate"
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
          />
        </div>

        <div className="flex sm:gap-10 gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-sky text-white rounded-xl mt-4">
            Create Book
          </button>
          <Link
            href="/library"
            className="px-4 py-2 bg-gray text-black rounded-xl mt-4">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
