/**
 * Creates a star component to display the rating. 
 * This is only for display. The user cannot edit the rating with this component. 
 */

import Image from "next/image";
import { ReactElement } from "react";


/**
 * 
 * @param number the current rating
 * @returns JSX Element
 */
export default function Stars({ number }: { number: number }) {
const starsArray: ReactElement[] = [];
for (let i = 0; i < 5; i++) {
  starsArray.push(
    <div className="relative md:w-8 md:h-8 w-5 h-5" key={crypto.randomUUID()}>
      <Image
        src={i < number ? "/star.svg" : "/emptyStar.svg"}
        fill
        alt="star"
        sizes=""
      />
    </div>
  );
}

  return <div className="flex gap-3">{starsArray}</div>;
}
