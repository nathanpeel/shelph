import React, { ReactElement } from 'react'

const Modal = ({
  children,
  isOpen,
}: {
  children: React.ReactElement;
  isOpen: boolean;
}): ReactElement | null => {
  if (!isOpen) return null;

  return (
    <div className="z-20 fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center text-white backdrop-blur-md backdrop-brightness-75">
      <div>{children}</div>
    </div>
  );
};

export default Modal