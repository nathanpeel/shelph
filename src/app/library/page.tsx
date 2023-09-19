import React from 'react'
import Navbar from '@/components/navbar'
import Book from '@/components/book'

const Library = () => {
  return (
    <div className='bg-white h-[100vh] text-black'>
      <Navbar current='Your Library' />
      <main className='flex flex-col items-center'>
        <h1 className='text-green sm:text-5xl font-bold text-3xl'>Your Books</h1>
        <h2 className='sm:text-2xl text-lg font-semibold my-4 sm:my-8'>Books read: 0</h2>
        <button className='rounded-full bg-gradient-to-br from-pink to-orange text-white py-2 px-6 text-lg sm:font-medium font-semibold'>New book</button>
      </main>

      <section className='mt-10 sm:mt-20 flex flex-col items-center'>
        <Book/>
      </section>
    </div>
  )
}

export default Library