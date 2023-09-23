import React, {
  ChangeEvent,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { newBookForm } from "@/app/types";
import Image from "next/image";

type props = {
  label: string;
  type: string;
  options?: string[];
  form: newBookForm;
  formKey: string;
  setForm: Dispatch<SetStateAction<newBookForm>>;
};

const InputField = ({
  label,
  type,
  options,
  form,
  formKey,
  setForm,
}: props) => {
  const checkBoxesObject: {
    [key: string]: boolean;
  } = {};
  const [checkboxes, setCheckBoxes] = useState(checkBoxesObject);
  const [newCat, setNewCat] = useState("");

  //---Renders a text/number input---//
  if (type === "text" || type === "number" || type === "date") {
    const formValue = form[formKey as keyof newBookForm];
    if (typeof formValue !== "string" && typeof formValue !== "number") {
      throw new Error(
        "The passed in key does not match the passed in type: inputField"
      );
    }

    return (
      <div className="my-4">
        <label className="text-lg">{label}</label>
        <input
          type={type}
          value={formValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [formKey]: e.target.value });
          }}
          className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
        />
      </div>
    );
  }

  //---Renders a checkbox input based on the passed in options---//
  if (type === "checkbox") {
    if (!options)
      throw new Error(
        "Options must be provided if the checkbox type is selected: inputField"
      );
    // options.forEach((el, index) => {
    //   setCheckBoxes({...checkboxes, [index]: false});
    // })
    const formValue = form[formKey as keyof newBookForm];
    if (typeof formValue !== "object")
      throw new Error("formKey does not match checkbox input: inputField");

    return (
      <div>
        <label className="text-lg">{label}</label>
        {options.map((el, index) => (
          <div key={crypto.randomUUID()} className="flex gap-3">
            <input
              type="checkbox"
              name={el}
              checked={checkboxes[index]}
              onChange={(e) => {
                const { name, checked } = e.target;
                setCheckBoxes({ ...checkboxes, [index]: checked });
                setForm({
                  ...form,
                  [formKey]: { ...formValue, [el]: checked },
                });
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
            className="hover:border-black focus:border-sky focus:outline-none border-2 border-transparent shadow-lg rounded-xl w-[100%] h-10"
          />
          <button
            onClick={() => {
              setNewCat('');
              setForm({
                ...form,
                [formKey]: { ...formValue, [newCat]: false }
              });
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

    const formValue = form[formKey as keyof newBookForm];
    if (typeof formValue !== "string" && typeof formValue !== "number") {
      throw new Error(
        "The passed in key does not match the passed in type: inputField"
      );
    }

    return (
      <div className="flex flex-col gap-1 my-4">
        <label className="text-lg">{label}</label>
        <select
          className="border-2 border-black rounded-full p-2"
          value={formValue}
          onChange={(e) => {
            setForm({ ...form, [formKey]: e.target.value });
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

  if (type === "stars") {
    const formValue = form[formKey as keyof newBookForm];
    if (typeof formValue !== "number") {
      throw new Error(
        "The passed in key does not match the passed in type: inputField"
      );
    }

    const starsArray: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= formValue) {
        starsArray.push(
          <div
            className="relative md:w-8 md:h-8 w-6 h-6"
            key={crypto.randomUUID()}
            onClick={() => {
              setForm({ ...form, [formKey]: i });
            }}>
            <Image src="/star.svg" fill alt="star" />
          </div>
        );
      }

      if (i > formValue) {
        starsArray.push(
          <div
            className="relative md:w-8 md:h-8 w-6 h-6"
            key={crypto.randomUUID()}
            onClick={() => {
              setForm({ ...form, [formKey]: i });
            }}>
            <Image src="/emptyStar.svg" fill alt="star" />
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
            setForm({ ...form, [formKey]: 0 });
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
