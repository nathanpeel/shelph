/**
 * Navbar component
 */
import React, { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignOut } from "./SignOut";
import { auth } from "../../auth";

/**
 *
 * @param current the current tab/route being viewed
 * @returns JSX Element
 */
export default async function Navbar({ current }: { current: string }) {
  const session = await auth();
  let profileImage: string = "";
  if (session && session.user && session.user.image) {
    profileImage = session.user.image;
  }

  return (
    <div className="flex md:justify-between justify-center items-center sm:p-3 relative mb-5 sm:mb-10 mt-2">
      <div className="hidden md:block">
        <h1 className="text-4xl text-green font-bold sm:visible sm:w-full collapse w-0">
          Shelph
        </h1>
        <p className="text-sm sm:visible sm:w-full collapse w-0">
          Grow your mind
        </p>
      </div>
      <div className="bg-sky text-white md:text-lg text-md flex lg:gap-28 sm:gap-9 rounded-full sm:px-8 py-3 px-10">
        {
          // conditionally renders the buttons based on the index and which button the user is currently on
          ["Home", "Your Library", "Settings"].map((el, index) => {
            let folder = "";
            let icon = "";

            if (index === 0) {
              folder = "/dashboard";
              icon = "/home.svg";
            } else if (index === 1) {
              folder = "/library";
              icon = "/library.svg";
            } else if (index === 2) {
              folder = "/settings";
              icon = "/settings.svg";
            }

            // the styling class that all the button share
            let classFrame =
              "flex items-center md:gap-3 gap-1 sm:border-b-2 sm:p-1 px-7";
            // adds styles based on whether the button is the current page or not
            let className =
              el === current
                ? (classFrame += " opacity-60")
                : (classFrame += " border-sky");

            return (
              <Link
                className={className}
                href={folder}
                key={crypto.randomUUID()}>
                <Image
                  className="w-8 h-8"
                  width="1"
                  height="1"
                  src={icon}
                  alt={`${el} icon`}></Image>
                <p className="sm:visible sm:w-full collapse w-0">{el}</p>
              </Link>
            );
          })
        }
      </div>
      <div className="md:flex items-center gap-2 hidden">
        <Image
          src={profileImage}
          alt="Profile image"
          width={50}
          height={50}></Image>
        <SignOut />
      </div>
    </div>
  );
}
