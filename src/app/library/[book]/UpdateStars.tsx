"use client";

/**
 * Creates a component for updating the rating of a book using clickable stars.
 */

import Image from "next/image";
import { ReactElement } from "react";
import { useState } from "react";
import { updateRating } from "@/app/lib/actions";

/**
 * @param number current rating of the book
 * @param id id of the book
 * @returns JSX Element
 */
export default function UpdateStars({
  number,
  id,
}: {
  number: number;
  id: string;
}) {
  const [rating, setRating] = useState(number);

  async function handleClick(amount: number) {
    setRating(amount);
    await updateRating(amount, id); // uses server action to update database
  }

  const starsArray: ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div
        className="relative w-8 h-8"
        key={crypto.randomUUID()}
        onClick={() => {
          handleClick(i + 1);
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

  return <div className="flex gap-3">{starsArray}</div>;
}
