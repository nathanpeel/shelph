import React from 'react'

const Modal = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactElement;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!isOpen) return null;

  const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isOpen) {
      document.body.style.overflow ='unset'
    }

    setIsOpen(false);
  }

  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  return (
    <div onClick={handleParentClick} className="z-20 fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center text-white backdrop-blur-md backdrop-brightness-75">
      <div className='' onClick={handleChildClick}>{children}</div>
    </div>
  );
};

export default Modal