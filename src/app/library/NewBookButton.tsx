"use client";
import React, { useState, ChangeEvent, ReactElement } from "react";
import Modal from "@/components/modal";
import InputField from "@/components/inputField";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import {
  updateTitle,
  updateAuthor,
  updateImage,
  updateTotalPageCount,
  updateCurrentPageCount,
  updateStartDate,
  updateFinishDate,
  resetForm,
} from "../../../lib/redux/slices/newBookSlice";
import { useAuth } from "@clerk/nextjs";
import {
  loadBooks,
  loadSeries,
  loadCategories,
} from "../../../lib/redux/slices/userLibrarySlice";

const NewBookButton = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0); //manages the state of the page-based form modal
  const [isOpen, setIsOpen] = useState(false); //manages the open state of the modal

  //determines how the user can upload an image
  const [useImageUrl, setUseImageUrl] = useState(false);

  const formState = useAppSelector((state) => state.newBook);
  const seriesData = useAppSelector((state) => state.userLibrary.series);

  const dispatch = useAppDispatch();

  const { userId } = useAuth();

  //opens the modal and turns off scrolling
  const handleClick = (): void => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  //closes the modal and turns on scrolling. Also resets form data
  const handleCloseModal = (): void => {
    document.body.style.overflow = "visible";
    setIsOpen(false);
    setCurrentPage(0);
    dispatch(resetForm());
  };

  const changePage = (): void => {
    if (currentPage >= 5) {
      fetch("/api/library", {
        method: "POST",
        body: JSON.stringify({
          authId: userId,
          formData: formState,
        }),
      })
        .then((data) => {
          console.log("Book added succesfully");
          fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://shelph.vercel.app"
            }/api/library`
          )
            .then((data) => {
              if (data.ok) {
                return data.json();
              }
            })
            .then((data) => {
              const { booklist, categories, series } = data.userData;
              dispatch(loadBooks(booklist));
              dispatch(loadCategories(categories));
              dispatch(loadSeries(series));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      handleCloseModal();
    } else setCurrentPage(currentPage + 1);
  };

  const prevPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //reusable page button for going forward or back
  const pageButton = (text: string): ReactElement => {
    if (text === "Back") {
      return (
        <button
          className="sm:px-4 sm:py-2 bg-gray text-black px-3 py-1 rounded-xl mt-4"
          onClick={prevPage}>
          {text}
        </button>
      );
    }

    return (
      <button
        className="sm:px-4 sm:py-2 bg-sky text-white px-3 py-1 rounded-xl mt-4"
        onClick={changePage}>
        {text}
      </button>
    );
  };

  //an array of al the pages that can be cycled though based on the index
  const pagesArray: ReactElement[] = [
    //TITLE AND AUTHOR PAGE
    <div key="titleAndAuthor">
      <div className="my-4">
        <label className="text-lg">Book Title</label>
        <input
          type="text"
          value={formState.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateTitle(e.target.value));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="my-4">
        <label className="text-lg">Author</label>
        <input
          type="text"
          value={formState.author}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateAuthor(e.target.value));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="flex justify-center relative">
        {formState.title.length < 1 || formState.author.length < 1 ? (
          <p className="text-red-600 text-sm mt-6 mb-3">
            There must be a title and author
          </p>
        ) : (
          pageButton("Next")
        )}
      </div>
    </div>,

    //IMAGES
    <div key="images" className="flex flex-col items-center">
      <div className="flex flex-col my-6">
        {useImageUrl ? (
          <button
            className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4"
            onClick={() => {
              setUseImageUrl(false);
            }}>
            Upload Image Instead
          </button>
        ) : (
          <button
            className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4"
            onClick={() => {
              setUseImageUrl(true);
            }}>
            Use image Adress Instead
          </button>
        )}
      </div>

      {useImageUrl ? (
        <div className="my-4">
          <p className="text-sky">Optional</p>
          <label className="text-lg">Paste an image address</label>
          <input
            type="text"
            value={formState.image}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateImage(e.target.value));
            }}
            className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
          />
        </div>
      ) : (
        <div className="my-4 flex flex-col items-center sm:items-start">
          <p className="text-sky">Optional</p>
          <label className="text-lg">{"Upload an image"}</label>
          <input
            type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
              
                function getFileExtension(fileName: string): string {
                  if (!fileName) return '';

                  const string = fileName.split('.').pop()

                  if (string) return '.' + string.toLowerCase();
                  return '';
                }

              //this converts an image into a DataURL to store in the database
              const input = e.target;
              if (input.files) {
                if (input.files.length > 0) {
                  const fileSize = input.files[0].size;
                  const fileName: string = input.files[0].name;
                  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp']

                  const maxFileSize = 500 * 500;

                  if (fileSize > maxFileSize) {
                    alert(
                      "Image is to large. Please select a smaller image or adjust the file size. "
                    );
                    e.target.value = '';
                    return;
                  }
                  if (!validExtensions.includes(getFileExtension(fileName))) {
                    alert('Invalid file type. Please select a .jpg, .jpeg, .png, or .webp file');
                    e.target.value = '';
                    return;
                  }
                }
              }

              if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = function (e) {
                  if (e.target) {
                    const dataUrl = e.target.result;
                    if (dataUrl) {
                      const newImage = dataUrl.toString();
                      dispatch(updateImage(newImage));
                    }
                  }
                };

                reader.readAsDataURL(input.files[0]);
              }

            }}
            className="file:hover:border-black file:focus:border-sky file:focus:outline-none file:border-2 file:shadow-lg file:rounded-xl sm:file:w-[60%] file:h-10 file:bg-white p-4 -mb-7 file:mr-3 underline text-sky file:border-gray file:border-solid ml-20 sm:-ml-4"
          />
        </div>
      )}
      <div className="flex gap-5 items-center justify-center">
        {pageButton("Back")}
        {pageButton("Next")}
      </div>
    </div>,

    //SERIES AND CATEGORY PAGE
    <div key="seriesAndCategory">
      <p className="mt-1 mb-[-20px] text-sky">Both are optional</p>
      <InputField label="Select a series" type="select" options={seriesData} />
      <InputField label="Select categories" type="checkbox" />
      <div className="flex gap-5 items-center justify-center">
        {pageButton("Back")}
        {pageButton("Next")}
      </div>
    </div>,

    //RATING PAGE
    <div key="ratingPage">
      <InputField label="Rate the book" type="stars" />
      <div className="flex gap-5 items-center justify-center">
        {pageButton("Back")}
        {pageButton("Next")}
      </div>
    </div>,

    //PAGE COUNT PAGE
    <div key="pageCountPage">
      <div className="my-4">
        <label className="text-lg">{`Enter the book's total page count`}</label>
        <input
          type="number"
          accept="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateTotalPageCount(Number(e.target.value)));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="my-4">
        <label className="text-lg">
          How many pages are you into this book?
        </label>
        <input
          type="number"
          accept="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateCurrentPageCount(Number(e.target.value)));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="flex gap-5 items-center justify-center relative">
        {pageButton("Back")}
        {Number(formState.totalPageCount) <
        Number(formState.currentPageCount) ? (
          <p className="text-red-600 text-sm absolute bottom-11">
            total page count cannot be less than current page count
          </p>
        ) : formState.totalPageCount < 1 ? (
          <p className="text-red-600 text-sm absolute bottom-11">
            Please enter a total page count to continue
          </p>
        ) : (
          pageButton("Next")
        )}
      </div>
    </div>,

    //DATE PAGE
    <div key="datePage">
      <div className="my-4">
        <label className="text-lg">Please select a start date</label>
        <input
          type="date"
          value={formState.startDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateStartDate(e.target.value));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="my-4">
        <label className="text-lg">
          Please select a finish date if applicable
        </label>
        <input
          type="date"
          value={formState.finishDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateFinishDate(e.target.value));
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
        />
      </div>
      <div className="flex gap-5 items-center justify-center">
        {pageButton("Back")}
        {pageButton("Create book")}
      </div>
    </div>,
  ];

  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold">
        New book
      </button>
      <Modal isOpen={isOpen}>
        <div className="bg-white sm:w-[60vw] md:w-[700px] w-[80vw] text-black rounded-xl flex flex-col items-center p-3 relative">
          <button
            onClick={() => {
              handleCloseModal();
            }}
            className="absolute top-3 right-3 rounded-full border-2 shadow-xl py-1 px-2 text-red-600 text-xs">
            X
          </button>
          <p className="text-2xl">Enter the Book Details</p>
          {pagesArray[currentPage]}
        </div>
      </Modal>
    </div>
  );
};

export default NewBookButton;
