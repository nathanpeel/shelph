import React, { useContext } from 'react'
import Navbar from '@/components/navbar'
import Book from '@/components/book'
import NewBookButton from './NewBookButton'

const Library = () => {

  return (
    <div>
      <Navbar current='Your Library' />
      <div className='flex flex-col items-center'>
        <h1 className='text-green sm:text-5xl font-bold text-3xl'>Your Books</h1>
        <h2 className='sm:text-2xl text-lg font-semibold my-4 sm:my-8'>Books read: 0</h2>
        <NewBookButton/>
      </div>

      <section className='my-10 sm:mt-20 flex flex-col items-center sm:gap-[85px] gap-[60px]'>
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </section>
    </div>
  )
}

export default Library