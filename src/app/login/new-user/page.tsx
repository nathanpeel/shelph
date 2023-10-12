"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewUser = () => {
  const [newUserForm, setNewUsetForm] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });
  const router = useRouter();

  const validateForm = () => {
    //this function returns the correct button/text to render based on the state of the form

    const notValid = (message: string = "Invalid Information"): ReactElement => (
      <div>
        {message}
      </div>
    ); //this component is a frame for error messages

    if (newUserForm.email.length < 1) return notValid('You must include an email');
    if (newUserForm.passwordOne.length < 8) return notValid('Password length must be greater than 8');
    if (newUserForm.passwordOne !== newUserForm.passwordTwo) return notValid("Passwords must match");

    return (
      //this button adds the user to the database
        <button
          onClick={() => {
            router.push("/login");
            fetch("/api/auth", {
              method: "POST",
              body: JSON.stringify({
                username: newUserForm.email,
                password: newUserForm.passwordOne
              }),
            })
              .then((res) => res.json())
              .catch((err) =>
                console.log(`Cannot add user to database. Error: ${err}`)
            );
            //resets the form 
            setNewUsetForm({
              email: "",
              passwordOne: "",
              passwordTwo: "",
            });
          }}
        
          className="sm:px-6 sm:py-3 bg-sky text-white px-5 py-2 rounded-xl relative">
          Create Account
        </button>
    );
  }

  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold sm:text-8xl text-center mb-20 text-white">
        Create an Account
      </h1>

      <div className=" sm:w-[500px] bg-white p-10 rounded-xl flex w-80 flex-col items-center text-black mb-10 shadow-lg">
        <h2 className="sm:text-4xl sm:mb-8 text-2xl font-bold mb-5">Sign Up</h2>
        <div className="flex flex-col gap-5 mb-10">

          <div className="w-[90%]">
            <label className="text-sm">Email</label>
            <input
              className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
              onChange={(e) =>
                setNewUsetForm({ ...newUserForm, email: e.target.value })
              }
              value={newUserForm.email}
            />
          </div>

          <div className="w-[90%]">
            <label className="text-sm">Password</label>
            <input
              className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
              onChange={(e) =>
                setNewUsetForm({ ...newUserForm, passwordOne: e.target.value })
              }
              value={newUserForm.passwordOne}
            />
          </div>

          <div className="w-[90%]">
            <label className="text-sm">Confirm password</label>
            <input
              className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
              onChange={(e) =>
                setNewUsetForm({ ...newUserForm, passwordTwo: e.target.value })
              }
              value={newUserForm.passwordTwo}
            />
          </div>

        </div>
        {validateForm()} 
      </div>

      <p className="text-black">
        Already have an account? Click&nbsp;
        <span className="text-sky underline">
          <Link href="/login">here</Link>
        </span>
      </p>
    </div>
  );
};

export default NewUser;
