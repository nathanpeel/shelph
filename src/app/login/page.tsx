"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold sm:text-8xl text-center mb-20 text-white">
        Welcome to Shelph
      </h1>

      <div className=" sm:w-[500px] bg-white p-10 rounded-xl flex w-80 flex-col items-center text-black mb-10 shadow-lg">
        <h2 className="sm:text-4xl sm:mb-8 text-2xl font-bold mb-5">Sign In</h2>
        <div className="w-[90%]">
          <label className="text-sm">Email</label>
          <input
            className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
            value={loginInfo.username}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, username: e.target.value });
            }}
          />
        </div>
        <div className="sm:my-8 my-5 w-[90%]">
          <label className="text-sm">Password</label>
          <input
            className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
            value={loginInfo.password}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
          />
        </div>

        <button
          onClick={() => {
            //this is supposed to direct the user to the library page if the sign in was successful
            //not currently working
            fetch('/api/auth', {
              method: 'PUT',
              body: JSON.stringify(loginInfo)
            })
              .then(data => {
                console.log(data)
                if (!data) {
                  router.push('/library')
                }
            })
          }}
          className="sm:px-6 sm:py-3 bg-sky text-white px-5 py-2 rounded-xl">
          Sign In
        </button>

        {(isValid ? null : <p>Username or password are incorrect</p>)}
      </div>

      <p className="text-black">
        Don&#39;t have account? Create one&nbsp;
        <span className="text-sky underline">
          <Link href="/login/new-user">here</Link>
        </span>
      </p>

    </div>
  );
};

export default Login;
