"use client";

/**
 * Component for delete and edit book functionality
 *
 */

import { useState } from "react";
import { deleteBook } from "@/app/lib/actions";

/**
 * 
 * @param title the title of the book
 * @param id the id of the book
 * @returns JSX Element
 */
export default function DeleteEdit({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmTitleInput, setConfirmTitleInput] = useState("");

  return (
    <div>
      <div className="flex justify-center gap-5 mb-10">
        <button className="bg-sky text-white text-center text-xl font-bold w-[45%] rounded-full py-2">
          Edit
        </button>
        <button
          className="bg-red text-white text-center text-xl font-bold w-[18%] rounded-full py-2"
          onClick={() => {
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
                console.log(confirmTitleInput == title);
              }}
            />
            <div className="flex gap-5 mt-4 items-center">
              <button
                className="py-2 px-6 bg-green rounded-full text-white font-bold"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setConfirmTitleInput("");
                }}>
                Cancel
              </button>
              {confirmTitleInput == title && (
                <div>
                  <button
                    className="text-red underline"
                    onClick={() => {
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
    </div>
  );
}
