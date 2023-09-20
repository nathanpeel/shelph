'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal';

const NewBookButton = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {

    document.body.style.overflow = 'hidden';

    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={handleClick} className="rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold">
        New book
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='bg-white opacity-100 sm:w-[60vw] md:w-[700px] w-[80vw] text-black rounded-xl flex flex-col items-center'>
          <p>Enter the Book Details</p>
        </div>
      </Modal>
    </div>
  );
}

export default NewBookButton