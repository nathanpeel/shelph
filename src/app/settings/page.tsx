import Navbar from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-white h-[100vh] text-black">
      <Navbar current="Settings" />
      <div className="flex flex-col items-center">
        <div className="flex flex-col sm:flex-row w-1/3 items-center gap-10 justify border-gray text-white bg-sky rounded-3xl sm:py-6 sm:px-12 p-5 text-lg">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "h-20 w-20",
              },
            }}
          />
          <p>Your account</p>
        </div>
      </div>
    </div>
  );
}
