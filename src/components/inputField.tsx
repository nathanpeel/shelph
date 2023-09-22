import React, { ChangeEvent, MouseEventHandler, Dispatch, SetStateAction, useState } from "react";
import { newBookForm } from "@/app/types";

type props = {
  label: string;
  type: string;
  options?: string[];
  form: newBookForm;
  formKey: string;
  setForm: Dispatch<
    SetStateAction<newBookForm>
  >;
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

  //---Renders a text/number input---//
  if (type === "text" || type === "number") {
    const formValue = form[formKey as keyof newBookForm];
    if (typeof formValue !== 'string' && typeof formValue !== 'number') {
      throw new Error('The passed in key does not match the passed in type: inputField')
    }

      return (
        <div>
          <label className="text-sm">{label}</label>
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
    if (!options) throw new Error('Options must be provided if the checkbox type is selected: inputField');
    // options.forEach((el, index) => {
    //   setCheckBoxes({...checkboxes, [index]: false});
    // })
    const formValue = form[formKey as keyof newBookForm];
    console.log(formKey)
    console.log('test', typeof formValue)
    if (typeof formValue !== 'object') throw new Error('formKey does not match checkbox input: inputField')

    return (
      <div>
        <label>{label}</label>
        {options.map((el, index) => (
          <div key={crypto.randomUUID()}>
            <label key={crypto.randomUUID()}>{el}</label>
            <input type="checkbox" name={el} checked={checkboxes[index]} onChange={(e) => {
              const { name, checked } = e.target;
              setCheckBoxes({ ...checkboxes, [index]: checked })
              setForm({...form, [formKey]: {...formValue, [el]: checked}})
            }} />
          </div>
          ))}
      </div>
    )
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
      <div>
        <label>{label}</label>
        <select
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

  //---throws error if no valid type was entered---//
  //not dependent on user input
  else {
    throw new Error("Incorrect type entered");
  }
};

export default InputField;
