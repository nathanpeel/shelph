"use client";
import React, { use, useState, ChangeEvent } from "react";
import Modal from "@/components/modal";
import InputField from "@/components/inputField";
import { newBookForm } from "../types";

const NewBookButton = () => {
  const date = new Date(Date.now());
  const formatedDate = `${date.getFullYear()}-${
      (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
    }-${date.getDate()}`

  const [currentPage, setCurrentPage] = useState(0);
  const defaultForm: newBookForm = {
    title: "",
    author: "",
    series: "",
    category: {
      fantasy: false,
      "summer reading list": false,
    },
    rating: 0,
    totalPageCount: 0,
    currentPageCount: 0,
    startDate: formatedDate,
    finishDate: formatedDate,
  };

  const [form, setForm] = useState(defaultForm);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    document.body.style.overflow = "hidden";

    setIsOpen(true);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "visible";
    setIsOpen(false);
    setCurrentPage(0);
    setForm(defaultForm);
  };

  const changePage = () => {
    if (currentPage >= 4) {
      console.log(form);
      handleCloseModal();
    } else setCurrentPage(currentPage + 1);
  };

  /*arguments for InputField: 
  label,
  type,
  options,
  form,
  formKey,
  setForm,
  onNextButtonClick,
  */
  
  const nextButton = (text: string): React.ReactElement => {
    return (
      <button
        className="sm:px-4 sm:py-2 bg-sky text-white px-3 py-1 rounded-xl mt-4"
        onClick={changePage}>
        {text}
      </button>
    );
  }

  const pagesArray: React.ReactElement[] = [
    <div key="titleAndAuthor">
      <InputField
        label="Book Title"
        type="text"
        form={form}
        formKey="title"
        setForm={setForm}
      />
      <InputField
        label="Author"
        type="text"
        form={form}
        formKey="author"
        setForm={setForm}
      />
      {nextButton("Next")}
    </div>,
    <div key="seriesAndCategory">
      <InputField
        label="Select a series"
        type="select"
        form={form}
        formKey="series"
        setForm={setForm}
        options={[
          "None",
          "Berserk",
          "Dune",
          "Monster",
          "The Gentleman Bastards",
        ]}
      />
      <InputField
        label="Select categories"
        type="checkbox"
        form={form}
        formKey="category"
        setForm={setForm}
        options={Object.keys(form.category)}
      />
      {nextButton("Next")}
    </div>,
    <div key="ratingPage">
      <InputField
        label='Rate the book'
        type='stars'
        form={form}
        formKey='rating'
        setForm={setForm}
      />
      {nextButton("Next")}
    </div>,
    <div key="pageCountPage">
      <InputField
        label="Enter the book's page count"
        type="number"
        form={form}
        formKey="totalPageCount"
        setForm={setForm}
      />
      <InputField
        label="How many pages are you into this book?"
        type="number"
        form={form}
        formKey="currentPageCount"
        setForm={setForm}
      />
      {Number(form.totalPageCount) < Number(form.currentPageCount) ? (
        <p>total page count cannot be less than current page count</p>
      ) : (
        nextButton("Next")
      )}
    </div>,
    <div key="datePage">
      <InputField
        label="Please select a start date"
        type="date"
        form={form}
        formKey="startDate"
        setForm={setForm}
      />
      <InputField
        label="Please select a finish date if applicale"
        type="date"
        form={form}
        formKey="finishDate"
        setForm={setForm}
      />
      {nextButton("Create book")}
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
        <div className="bg-white opacity-100 sm:w-[60vw] md:w-[700px] w-[80vw] text-black rounded-xl flex flex-col items-center p-3 relative">
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
