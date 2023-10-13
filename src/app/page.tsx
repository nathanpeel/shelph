'use client'
import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

export default function Home(): ReactElement {

  const router = useRouter();
  setTimeout(() => {
    router.push('/library')
  }, 999)

  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center pt-80">
      <h1 className="text-7xl font-bold sm:text-9xl text-center mb-20 text-white">
        <p className="transition-opacity ease-in duration-100 opacity-100">
          Shelph
        </p>
      </h1>
    </div>
  );
}
