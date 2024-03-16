import Navbar from "@/components/navbar";
import BookList from "./BookList";

const Library = async () => {

  return (
    <div>
      <Navbar current="Your Library" />
      <div className="flex flex-col items-center">
        <h1 className="text-green sm:text-5xl font-bold text-3xl">
          Your Books
        </h1>
        <BookList />
      </div>
    </div>
  );
};

export default Library;
