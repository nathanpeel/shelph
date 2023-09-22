"use client";
import React, { use, useState } from "react";
import Modal from "@/components/modal";

const NewBookButton = () => {
  const [currentInput, setCurrentInput] = useState("title");

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    document.body.style.overflow = "hidden";

    setIsOpen(true);
  };

  const changeForm = (nextForm: string) => {
    setCurrentInput(nextForm);
  };

  const bookInput = () => {
    if (currentInput === "title") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("author");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "author") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("series");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "series") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("category");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "category") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("rating");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "rating") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("total-page-count");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "total-page-count") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("current-page-count");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "current-page-count") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("start-date");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "start-date") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              changeForm("finish-date");
            }}>
            Next queston
          </button>
        </div>
      );
    }

    if (currentInput === "finish-date") {
      return (
        <div>
          {currentInput}
          <input type="text" />
          <button
            onClick={() => {
              console.log('Form submitted')
              changeForm('title')
              setIsOpen(false);
            }}>
            Next queston
          </button>
        </div>
      );
    }

  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold">
        New book
      </button>
      {/* Consider making the input field it's own component */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-white opacity-100 sm:w-[60vw] md:w-[700px] w-[80vw] text-black rounded-xl flex flex-col items-center p-3">
          <p className="text-2xl">Enter the Book Details</p>
          {bookInput()}
        </div>
      </Modal>
    </div>
  );
};

export default NewBookButton;
