/**
 * Route for the settings page. 
 * Current this is just where the user can log out.
 * Eventually, there will be options to change to dark mode and more. 
 */
import Navbar from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";
import { getUserInfo } from "../lib/data";

/**
 * 
 * @returns JSX Element
 */
export default async function Page() {
  // This is just a place holder for the data fetching for this route
  const data = await getUserInfo();

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
