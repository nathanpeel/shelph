import { SignIn } from "@/components/SignIn";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center sm:pt-80 pt-[25dvh]">
        <div className="flex flex-col items-center bg-white rounded-3xl sm:py-40 py-20 sm:px-16 px-5">
          <h1 className="text-3xl font-bold sm:text-6xl text-center sm:mb-20 mb-10">
            Welcome to Shelph
          </h1>
          <SignIn />
          <Link href="/" className="underline mt-10">
            go back to landing page
          </Link>
        </div>
      </div>
    </main>
  );
}
