/**
 * the main route which is current the login page. 
 * This will be updated to have a landing page in the future. 
 */
import { ReactElement } from "react";
import Link from "next/link";

export default function Page(): ReactElement {

  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center pt-80">
      <h1 className="text-7xl font-bold sm:text-9xl text-center mb-20 text-white">
        <p className="transition-opacity ease-in duration-100 opacity-100">
          Welcome to Shelph
        </p>
      </h1>
      <Link href="/library">Login</Link>
    </div>
  );
}
