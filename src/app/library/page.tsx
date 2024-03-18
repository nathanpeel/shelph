import Navbar from "@/components/Navbar";
import BookList from "./BookList";
import Link from "next/link";

const Library = async () => {
  return (
    <div>
      <Navbar current="Your Library" />
      <div className="flex flex-col items-center">
        <h1 className="text-green sm:text-5xl font-bold text-3xl">
          Your Books
        </h1>
        <Link href="/library/new-item">New Item</Link>
        <BookList />
      </div>
    </div>
  );
};

export default Library;
