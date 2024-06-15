/**
 * the main route which is current the login page.
 * This will be updated to have a landing page in the future.
 */
import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page(): ReactElement {
  return (
    <main className="bg-gradient-to-t from-yellow to-strawberry flex flex-col pt-8">
      <div className="flex flex-col items-end px-20 mb-10">
        <Link href="/library" className="text-white text-2xl">
          Sign in
        </Link>
      </div>

      <div className="bg-white flex px-32 gap-10 py-20 items-start justify-center">
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-3 mb-20">
            <p className="text-green font-black text-2xl">Welcome to Shelph</p>
            <h1 className="font-black text-6xl">
              Keep track of your reading progress as you grow your mind
            </h1>
            <p className="font-medium text-xl">
              A reading list and watch list management application for keeping
              track of the stories that matter
            </p>
          </div>
          <button className="bg-sky py-2 px-5 rounded-2xl font-bold">
            <Link href="/library" className="text-white text-3xl">
              Sign in
            </Link>
          </button>
        </div>
        <div className="w-[70dvw] h-[500px] relative">
          <Image
            className="object-contain"
            fill
            sizes="1"
            src="/hero-books.png"
            alt="Book covers for The Lies of Locke Lamora by Scott Lynch, Behave by Robert Sapolsky, and Dune by Frank Herbert"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-20 text-5xl font-black py-20">
        <div className="flex items-start gap-16">
          <div className="relative w-5/6 h-[400px]">
            <Image
              src="/library-page-img.png"
              className="object-contain"
              fill
              sizes="1"
              alt="Library page image"
            />
          </div>
          <h2>See all of your books under the library page</h2>
        </div>
        <div className="flex items-start gap-16">
          <h2>Keep track of your progress of each book</h2>
          <div className="relative w-5/6 h-[400px]">
            <Image
              src="/book-page-img.png"
              className="object-contain"
              fill
              sizes="1"
              alt="Library page image"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
