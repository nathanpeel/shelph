import { SignIn } from "@/components/SignIn";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center pt-80">
        <div className="flex flex-col items-center bg-white rounded-3xl py-40 px-16">
          <h1 className="text-4xl font-bold sm:text-6xl text-center mb-20">
            Welcome to Shelph
          </h1>
          <SignIn />
          <Link href="/" className="underline mt-10">go back to landing page</Link>
        </div>
      </div>
    </main>
  );
}
