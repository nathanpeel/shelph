"use client";
import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold sm:text-8xl text-center mb-20">
        Welcome to Shelph
      </h1>

      <div className=" sm:w-[500px] bg-white p-10 rounded-xl flex w-80 flex-col items-center text-black mb-10 shadow-lg">
        <h2 className="sm:text-4xl sm:mb-8 text-2xl font-bold mb-5">Sign In</h2>
        <div className="w-[90%]">
          <label className="text-sm">Username</label>
          <input className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10" />
        </div>
        <div className="sm:my-8 my-5 w-[90%]">
          <label className="text-sm">Password</label>
          <input className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10" />
        </div>
        <Link
          href="/library"
          className="sm:px-6 sm:py-3 bg-sky text-white px-5 py-2 rounded-xl">
          Sign In
        </Link>
      </div>

      <p className="text-black">
        Don&#39;t have account? Create one &nbsp;
        <span className="text-sky underline">
          <Link href="">here</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
