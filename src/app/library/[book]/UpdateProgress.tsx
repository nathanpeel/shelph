"use client";

/**
 * Component for updating reading progress
 */

import { useState } from "react";
import Image from "next/image";
import { updateProgress } from "@/app/lib/actions";

/**
 *
 * @function UpdateProgress
 * @param currentPageCount the user's current place in the book via page count
 * @param totalPageCount the total page count of the book
 * @param id the book id
 * @returns JSX Element
 */
export default function UpdateProgress({
  currentPageCount,
  totalPageCount,
  id,
}: {
  currentPageCount: number;
  totalPageCount: number;
  id: string;
}) {
  // the type is number or undefined so the user can clear the field
  const [newCount, setNewCount] = useState<number | undefined>(
    currentPageCount
  );

  /**
   * Uses server action to update reading progress
   */
  function handleSave() {
    if (newCount !== undefined) {
      updateProgress(newCount, id);
    }
  }

  return (
    <div className="flex flex-col items-center mb-10 text-lg">
      <h2 className="text-sky text-2xl font-semibold mb-3">
        Update Reading Progress
      </h2>
      <div className="flex gap-10 justify-between rounded-full shadow-lg py-3 px-7 border-2 border-gray items-center">
        <div className="flex gap-2 items-center">
          <p>Current Page</p>
          <p className="bg-gradient-to-br from-pink to-orange bg-clip-text text-transparent text-2xl font-bold">
            {currentPageCount}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <p>Updated</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newCount === undefined ? "" : newCount}
              onChange={(e) => {
                const value = e.target.value.trim();
                // ensures user can clear the field while ensuring the value is a number and not negative
                if (
                  value === "" ||
                  (!isNaN(+value) && +value >= 0 && +value <= totalPageCount)
                ) {
                  setNewCount(value === "" ? undefined : +value);
                }
              }}
              min={0}
              className="bg-green w-24 rounded-xl text-white h-10 px-2 text-2xl font-bold"
            />
            <div className="flex flex-col">
              <div
                className="flex justify-center"
                onClick={(e) => {
                  if (newCount === undefined) {
                    currentPageCount + 1 <= totalPageCount
                      ? setNewCount(currentPageCount + 1)
                      : "";
                  } else if (newCount + 1 <= totalPageCount) {
                    setNewCount(newCount + 1);
                  }
                }}>
                <Image
                  className="w-8 h-8"
                  width="1"
                  height="1"
                  src="/triangle.svg"
                  alt="triangle button"
                />
              </div>
              <div
                className="rotate-180 flex justify-center"
                onClick={(e) => {
                  if (newCount !== undefined && newCount > 0) {
                    setNewCount(newCount - 1);
                  }
                }}>
                <Image
                  className="w-8 h-8"
                  width="1"
                  height="1"
                  src="/triangle.svg"
                  alt="triangle button"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold">
          Save
        </button>
      </div>
    </div>
  );
}
