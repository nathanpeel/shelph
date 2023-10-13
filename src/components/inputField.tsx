'use client'

import React, {
  ChangeEvent,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { newBookForm } from "@/app/types";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { updateTitle, updateAuthor, updateSeries, updateStartDate, updateFinishDate, updateRating, updateTotalPageCount, updateCurrentPageCount, updateCateogry, loadCategories} from '../../lib/redux/slices/newBookSlice';
/*
---reducers---
updateTitle, updateAuthor, updateSeries, updateCateogry, loadCategories, updateRating, updateTotalPageCount, updateCurrentPageCount, updateStartDate, updateFinishDate, resetForm 

*/

type props = {
  label: string;
  type: string;
  options?: string[];
};

const InputField = ({
  label,
  type,
  options,
}: props) => {
  const [newCat, setNewCat] = useState("");

  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.newBook);

  //---Renders a checkbox input based on the passed in options---//
  if (type === "checkbox") {

    return (
      <div>
        <label className="text-lg">{label}</label>
        {Object.keys(state.category).map((el) => (
          <div key={crypto.randomUUID()} className="flex gap-3">
            <input
              type="checkbox"
              name={el}
              checked={state.category[el]}
              onChange={() => {
                dispatch(updateCateogry(el));
              }}
            />
            <label>{el}</label>
          </div>
        ))}
        <div className="my-3 flex flex-col items-end gap-2">
          <label className="self-start">Add a new category</label>
          <input
            value={newCat}
            type="text"
            onChange={(e) => {
              setNewCat(e.target.value);
            }}
            className="hover:border-black focus:border-sky focus:outline-none border-2 shadow-lg rounded-xl w-[100%] h-10 border-gray"
          />
          <button
            onClick={() => {
              dispatch(loadCategories([newCat]));
              setNewCat("");
            }}
            className=" bg-orange text-white px-3 py-1 rounded-xl mt-1 text-sm">
            Add
          </button>
        </div>
      </div>
    );
  }

  //---Renders a select input based on the passed in options---//
  if (type === "select") {
    if (!options)
      throw new Error(
        "Options must be provided if the select type is selected: inputField"
      ); 

    return (
      <div className="flex flex-col gap-1 my-4">
        <label className="text-lg">{label}</label>
        <select
          className="border-2 border-black rounded-full p-2"
          value={state.series}
          onChange={(e) => {
            dispatch(updateSeries(e.target.value));
          }}>
          {options.map((el) => (
            <option value={el} key={crypto.randomUUID()}>
              {el}
            </option>
          ))}
        </select>
      </div>
    );
  }

  //--Renders rating selector using stars--//
  if (type === "stars") {

    const starsArray: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= state.rating) {
        starsArray.push(
          <div
            className="relative md:w-8 md:h-8 w-6 h-6"
            key={crypto.randomUUID()}
            onClick={() => {
              dispatch(updateRating(i))
            }}>
            <Image src="/star.svg" sizes="" fill alt="star" />
          </div>
        );
      }

      if (i > state.rating) {
        starsArray.push(
          <div
            className="relative md:w-8 md:h-8 w-6 h-6"
            key={crypto.randomUUID()}
            onClick={() => {
              dispatch(updateRating(i))
            }}>
            <Image src="/emptyStar.svg" sizes="" fill alt="star" />
          </div>
        );
      }
    }

    return (
      <div className="flex flex-col gap-3 my-5 items-center">
        <label className="text-lg">{label}</label>
        <div className="flex gap-2">{starsArray}</div>
        <button
          className="sm:px-4 sm:py-2 bg-orange text-white px-3 py-1 rounded-xl mt-4"
          onClick={() => {
            dispatch(updateRating(0))
          }}>
          No rating
        </button>
      </div>
    );
  }

  //---throws error if no valid type was entered---//
  //not dependent on user input
  else {
    throw new Error("Incorrect type entered");
  }
};

export default InputField;
