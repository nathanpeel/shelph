/**
 * the main route which is current the login page.
 * This will be updated to have a landing page in the future.
 */
import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page(): ReactElement {
  return (
    <main className="bg-gradient-to-t from-yellow to-strawberry flex flex-col md:pt-8 pt-5 items-center">
      <Link
        href="/library"
        className="text-white text-2xl md:px-20 px-10 md:mb-10 mb-5 self-end">
        Sign in
      </Link>

      <div className="bg-white flex flex-col md:flex-row px-36 md:gap-10 py-20 items-start justify-center">
        <div className="flex flex-col items-start">
          <div className="flex flex-col md:gap-3 gap-1 md:mb-20 mb-5">
            <p className="text-green font-black md:text-2xl text-xl">
              Welcome to Shelph
            </p>
            <h1 className="font-black lg:text-6xl text-3xl">
              Keep track of your reading progress as you grow your mind
            </h1>
            <p className="font-medium md:text-xl">
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
        <div className="w-[70dvw] h-[500px] relative md:mt-0 mt-5">
          <Image
            className="object-contain"
            fill
            sizes="1"
            src="/hero-books.png"
            alt="Book covers for The Lies of Locke Lamora by Scott Lynch, Behave by Robert Sapolsky, and Dune by Frank Herbert"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-20 md:text-5xl text-3xl font-black py-20 px-10">
        <div className="flex flex-col gap-10 items-center">
          <h2>See all of your books under the library page</h2>
          <div className="relative md:w-2/3 w-full md:h-[660px] h-[300px]">
            <Image
              src="/library-page-img.png"
              className="object-contain"
              fill
              sizes="1"
              alt="Library page image"
            />
          </div>
        </div>
        <div className="w-[70dvw] h-1 bg-black rounded-full"></div>
        <div className="flex flex-col items-center gap-10">
          <h2>Keep track of your progress of each book</h2>
          <div className="relative md:w-2/3 w-full md:h-[660px] h-[300px]">
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

      <div className="flex flex-col items-center gap-10 md:w-1/2 md:px-0 px-10">
        <h2 className="md:text-6xl text-3xl font-black">Development Notes</h2>
        <div className="bg-white rounded-2xl flex flex-col items-center w-full py-10 gap-10">
          <h3 className="text-2xl font-medium">Recent Updates</h3>
          <div className="flex flex-col items-start gap-2">
            <p className="px-5 xl:px-0">06/14/24</p>
            <div className="lg:px-20 px-10">
              <ul className="list-disc list-inside">
                <li>Migrated from Clerk to Auth.js</li>
                <li>Added new landing page</li>
                <li>Redesigned login page</li>
                <li>Added full book edit functionality</li>
                <li>Added quick start rating functionality</li>
                <li>Added quick page progress update functionality</li>
                <li>Added delete book capability</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col items-center w-full py-10 gap-10">
          <h3 className="text-2xl font-medium">Future Updates</h3>
          <div className="flex flex-col items-start gap-2 px-10">
            <ul className="list-disc list-inside">
              <li>Optimize Next.js features</li>
              <li>Add unit testing</li>
              <li>Allow users to group books by series</li>
              <li>Build out library and dashboard tab</li>
              <li>Allow users to group books and series by category</li>
              <li>Allow users to create notes</li>
              <li>Add dark/light mode</li>
              <li>Make UX interactive</li>
              <li>Allow users to add friends and view friend&apos;s list</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-20 flex flex-col items-center gap-4 px-10 text-center">
        <p>
          Developed by Nathan Peel. Read more about me{" "}
          <Link
            className="text-sky underline"
            href="https://www.nathanpeel.dev/">
            here
          </Link>
        </p>
        <div className="flex md:gap-20 gap-7">
          <Link
            className="underline text-sky"
            href="https://www.nathanpeel.dev/blog/shelph2890">
            Blog
          </Link>
          <Link className="underline text-sky" href="">
            GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
