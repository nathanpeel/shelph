import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type props = {
  current: string
}

const Navbar = ({current}: props) => {
  const navbarButtons: React.ReactElement[]  = [];
  const buttonNames = ['Home', 'Your Library', 'Settings'];

  buttonNames.forEach((el, index) => {
    let folder = ''
    let icon = ''

    if (index === 0) {
      folder = '/dashboard'
      icon = '/home.svg'
    }
    else if (index === 1) {
      folder = '/library'
      icon = '/library.svg'
    }
    else if (index === 2) {
      folder = '/settings'
      icon = '/settings.svg'
    }

    let classFrame = "flex items-center md:gap-3 gap-1 sm:border-b-2 sm:p-1 px-10";
    let className =
      el === current
        ? classFrame += ' opacity-60'
        : classFrame += ' border-sky';
    
    navbarButtons.push(
      <Link className={className} href={folder}>
        <Image
          className="w-8 h-8"
          width="1"
          height="1"
          src={icon}
          alt={`${el} icon`}></Image>
        <p className="sm:visible sm:w-full collapse w-0">{el}</p>
      </Link>
    );
  })

  return (
    <div className="flex justify-between items-center sm:p-3 relative mb-5 sm:mb-10">
      <div>
        <h1 className="md:text-5xl text-3xl text-green font-bold sm:visible sm:w-full collapse w-0">
          Shelph
        </h1>
        <p className="text-sm sm:visible sm:w-full collapse w-0">
          Grow your mind
        </p>
      </div>
        <div className="bg-sky text-white md:text-lg text-md flex lg:gap-36 md:gap-9 sm:gap-5 rounded-full sm:px-8 py-3 px-10 lg:mr-[65px] sm:mr-[28px]">
          {navbarButtons}
      </div>
      <Link className="self-start" href="/login">
        <p className="self-start sm:visible sm:w-full collapse w-0">Logout</p>
      </Link>
    </div>
  );
}

export default Navbar