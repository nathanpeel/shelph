"use client";

/**
 * Component for delete and edit book functionality
 *
 */

import { useState } from "react";
import { useFormState } from "react-dom";
import { editBook } from "@/app/lib/actions";
import { deleteBook } from "@/app/lib/actions";
import { bookType } from "@/app/types";

/**
 *
 * @param title the title of the book
 * @param id the id of the book
 * @returns JSX Element
 */
export default function DeleteEdit({ bookData }: { bookData: bookType }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmTitleInput, setConfirmTitleInput] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const initialState = { message: null, errors: {} };
  // uses server action to add book when form is submitted
  const [state, dispatch] = useFormState(editBook, initialState);

  // determines if the image field is a imageUrl or a file
  const [useImageUrl, setUseImageUrl] = useState(false);

  const { title, id, author, image, totalPageCount, startDate, finishDate } =
    bookData;

  return (
    <div>
      <div className="flex justify-center gap-5 mb-10">
        <button
          className="bg-sky text-white text-center text-xl font-bold w-[45%] rounded-full py-2"
          onClick={() => {
            setShowDeleteConfirm(false); // closes the delete confirm box in case it was open
            setShowEditForm(true);
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }, 5);
          }}>
          Edit
        </button>
        <button
          className="bg-red text-white text-center text-xl font-bold w-[18%] rounded-full py-2"
          onClick={() => {
            setShowEditForm(false); // closes the edit form in case it was open
            setShowDeleteConfirm(true);
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }, 5);
          }}>
          Delete
        </button>
      </div>
      {showDeleteConfirm && (
        <div className="flex flex-col items-center mb-20">
          <div className="border border-red rounded-2xl py-3 px-3 text-lg w-[40%] flex flex-col">
            <p>Are you sure you want to delete this book?</p>
            <p>This action cannot be undone.</p>
            <p className="mt-4">Type the title of the book to confirm.</p>
            <input
              type="text"
              className="border border-red rounded-full bg-gray px-2 py-2 my-2"
              value={confirmTitleInput}
              onChange={(e) => {
                setConfirmTitleInput(e.target.value);
              }}
            />
            <div className="flex gap-5 mt-4 items-center">
              <button
                className="py-2 px-6 bg-green rounded-full text-white font-bold"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setConfirmTitleInput("");
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }, 5);
                }}>
                Cancel
              </button>
              {confirmTitleInput == title && (
                <div>
                  <button
                    className="text-red underline"
                    onClick={() => {
                      console.log('trying to delete');
                      deleteBook(id);
                    }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showEditForm && (
        <div>
          <div className="flex flex-col items-center mb-20">
            <div className="flex flex-col items-center py-10">
              <h1 className="text-3xl text-center">Edit Book Details</h1>
              <p>
                Required fields are indicate by{" "}
                <span className="text-red">*</span>
              </p>
              <form
                action={dispatch}
                className="max-w-[1000px] w-full px-10"
                aria-describedby="form-error">
                <label htmlFor="id" hidden></label>
                <input type="text" id="id" name="id" defaultValue={id} hidden />
                {/* --- */}
                {/* TITLE */}
                <div className="my-8">
                  <label className="text-lg" htmlFor="title">
                    Book Title <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={title}
                    className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-full h-10 border-gray"
                    aria-describedby="title-error"
                  />
                  <div id="title-error" aria-live="polite" aria-atomic>
                    {state.errors?.title && (
                      <p className="mt-2 text-sm text-red">
                        Please enter a title
                      </p>
                    )}
                  </div>
                </div>

                {/* --- */}
                {/* AUTHOR */}
                <div className="my-8">
                  <label className="text-lg" htmlFor="author">
                    Author <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    defaultValue={author}
                    className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
                    aria-describedby="author-error"
                  />
                  <div id="author-error" aria-live="polite" aria-atomic>
                    {state.errors?.author && (
                      <p className="mt-2 text-sm text-red">
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
                        defaultValue={image}
                        name="image"
                        className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray border-solid"
                      />
                    </div>
                  ) : (
                    <div className="my-8 flex flex-col">
                      <label className="text-lg" htmlFor="image">
                        Upload an image
                      </label>
                      <input type="text" id="image" name="image" hidden defaultValue={image}/>
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
                                !validExtensions.includes(
                                  getFileExtension(fileName)
                                )
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
                                  const imageDataInput =
                                    document.getElementById(
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
                {/* <div className="flex flex-col gap-1 my-8">
                  <label className="text-lg" htmlFor="series">
                    Select a series
                  </label>
                  <select className="border-2 border-gray rounded-full p-2"> */}
                {/* Add options here */}
                {/* </select>
                </div> */}

                {/* --- */}
                {/* CATEGORIES */}
                {/* <div className="my-8"> */}
                {/* <label className="text-lg">Select categories</label> */}
                {/* Add checkboxes */}
                {/* </div> */}

                {/* --- */}
                {/* TOTAL PAGE COUNT */}
                <div className="my-8">
                  <label className="text-lg" htmlFor="totalPageCount">
                    Enter the book&apos;s total page count{" "}
                    <span className="text-red">*</span>
                  </label>
                  <input
                    type="number"
                    accept="number"
                    id="totalPageCount"
                    defaultValue={totalPageCount}
                    name="totalPageCount"
                    className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
                    aria-describedby="pageCount-error"
                  />
                  <div id="pageCount-error" aria-live="polite" aria-atomic>
                    {state.errors?.totalPageCount && (
                      <p className="mt-2 text-sm text-red">
                        Please enter a total page count
                      </p>
                    )}
                  </div>
                </div>

                {/* --- */}
                {/* START DATE */}
                <div className="my-8 flex flex-col">
                  <label className="text-lg" htmlFor="startDate">
                    Please select a start date
                  </label>
                  <input
                    type="date"
                    defaultValue={startDate}
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
                    defaultValue={finishDate}
                    id="finishDate"
                    name="finishDate"
                    className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
                  />
                </div>

                <div className="flex sm:gap-10 gap-4">
                  <button
                    type="submit"
                    onClick={() => {
                      setTimeout(() => {
                        setShowEditForm(false);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 10);
                    }}
                    className="px-4 py-2 bg-sky text-white rounded-xl mt-4">
                    Confirm Changes
                  </button>
                  <button
                    className="px-4 py-2 bg-gray text-black rounded-xl mt-4"
                    onClick={() => {
                      setShowEditForm(false);
                      setTimeout(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 5);
                    }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
