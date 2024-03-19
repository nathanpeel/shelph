"use client";

import Image from "next/image";
import { ReactElement } from "react";
import { useState } from "react";

export default function UpdateStars({ number }: { number: number }) {
  const [rating, setRating] = useState(number);

  function handleClick(amount: number) {
    setRating(amount);

    //add logic for updating database
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
