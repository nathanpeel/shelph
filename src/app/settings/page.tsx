/**
 * Route for the settings page.
 * Current this is just where the user can log out.
 * Eventually, there will be options to change to dark mode and more.
 */
import Navbar from "@/components/Navbar";
import { getUserInfo } from "../lib/data";
import AccountSettings from "./AccountSettings";
import { auth } from "../../../auth";
import Image from "next/image";
import { SignOut } from "@/components/SignOut";

/**
 *
 * @returns JSX Element
 */
export default async function Page() {
  // This is just a place holder for the data fetching for this route
  const data = await getUserInfo();

  const session = await auth();
  let profileImage: string = "";
  let profileName = "";
  if (session && session.user && session.user.image && session.user.name) {
    profileImage = session.user.image;
    profileName = session.user.name;
  }

  return (
    <div className="bg-white h-[100vh] text-black flex flex-col gap-10 min-h-fit pb-10">
      <Navbar current="Settings" />
      <div className="flex flex-col items-center mb-10 gap-2">
        <Image
          src={profileImage}
          alt="Profile image"
          width={100}
          height={100}></Image>
        <p className="text-4xl font-bold">{profileName}</p>
        <SignOut/>
      </div>
      <div className="flex flex-col items-center">
        <AccountSettings />
      </div>
    </div>
  );
}
