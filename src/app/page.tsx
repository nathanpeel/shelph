import Image from 'next/image'
import Link from 'next/link';

export default function Home() {


  //validate auth here
  //create some fancy animation that spins for a few seconds
  //after the few seconds, check if the auth has gotten a response,
  //if it has, load the appropriate page, otherwise continue loading

  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center pt-80">
      <h1 className="text-7xl font-bold sm:text-9xl text-center mb-20">
        <Link href='/login'>
          Shelph
        </Link>
      </h1>
    </div>
  );
}
