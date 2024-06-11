import Navbar from "@/components/Navbar";
import { getUserInfo } from "../lib/data";

export default async function Page() {
  // This is just a place holder for the data fetching for this route
  const data = await getUserInfo();

  return (
    <div className="bg-white h-[100vh] text-black">
      <Navbar current="Home" />
      <p className="text-center text-xl">Nothing here yet. Come back soon!</p>
    </div>
  );
}
