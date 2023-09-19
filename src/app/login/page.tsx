'use client'
import React, { useState } from 'react'
import Link from 'next/link';

const Login = () => {



  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold sm:text-8xl text-center mb-20">
        Welcome to Shelph
      </h1>

      <div className="bg-white p-10 rounded-xl flex flex-col items-center text-black mb-10">
        <h2 className="text-2xl font-bold mb-5">Sign In</h2>
        <div>
          <label className="text-sm">Username</label>
          <input className="border-2 border-black rounded-xl w-[100%] h-10" />
        </div>
        <div className='my-5'>
          <label className="text-sm">Password</label>
          <input className="border-2 border-black rounded-xl w-[100%] h-10" />
        </div>
        <button className='bg-sky text-white px-5 py-2 rounded-xl'>Sign In</button>
      </div>

      <p>Don&#39;t have account? Create one &nbsp;
        <span className='text-sky underline'>
          <Link href=''>here</Link>
        </span>
      </p>
    </div>
  );
}

export default Login