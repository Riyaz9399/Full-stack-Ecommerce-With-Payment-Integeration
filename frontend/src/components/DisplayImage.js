import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imageurl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto ">
        <div
          className="w-fit ml-auto p-2 text-lg hover:text-red-600 cursor-pointer "
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div className="flex justify-center p-4 mx-w-[80vw] max-h-[80vh] ">
          <img src={imageurl} alt="Product Image" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
