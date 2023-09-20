'use client'
import React, { createContext, useContext} from 'react'

export const ModalContext = createContext({});
export const Modal = ({ children }: { children: React.ReactNode }) => {
  let number = 0;

  const someFunc = () => {
    number++;
    console.log(number);
  }

  return (
    <ModalContext.Provider value={{ someFunc, number }}>
      {children}
    </ModalContext.Provider>
  )

}

export default Modal