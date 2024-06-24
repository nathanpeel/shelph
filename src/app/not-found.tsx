"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [time, setTime] = useState(10);

  useEffect(() => {

    const interval = setInterval(() => {
      if (time <= 1) {
        clearInterval(interval);
        router.push("/library");
      }
      setTime(time - 1);
    }, 1000)


  }, [router, time]);

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Book Not Found</h1>
      <p>The book you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/library" className="text-blue-500 hover:underline">
        Go back to your library
      </Link>
      <p className="mt-4">Redirecting in {time} seconds...</p>
    </div>
  );
}
