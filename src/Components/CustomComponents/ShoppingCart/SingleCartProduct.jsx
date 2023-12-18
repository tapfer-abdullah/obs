"use client";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const SingleCartProduct = () => {
  const [selectedItems, setSelectedItems] = useState(1);
  return (
    <div className="relative flex justify-between items-center space-x-4 my-3 shadow-md">
      <img src="https://i.ibb.co/34KMXfv/image.png" alt="product img" className="w-24 h-28" />
      <div className="flex flex-col gap-5 items-start flex-grow">
        <h4 className="text-lg">Luminary Luxe</h4>
        <div className="flex justify-between items-center space-x-3">
          <div className="text-xl font-bold">
            <button
              onClick={() => {
                setSelectedItems(selectedItems - 1);
              }}
              className="py-1 px-2 bg-slate-300 mx-[1px]"
            >
              -
            </button>
            <button className="py-1 px-2 bg-slate-300 mx-[1px]">{selectedItems}</button>
            <button
              onClick={() => {
                setSelectedItems(selectedItems + 1);
              }}
              className="py-1 px-2 bg-slate-300 mx-[1px]"
            >
              +
            </button>
          </div>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>50.00</span>
          </p>
        </div>
      </div>
      <button className="absolute top-[30%] right-2 hover:bg-red-300 bg-red-500 text-white p-2 rounded-full transition-all duration-300">
        <RxCross2 />
      </button>
    </div>
  );
};

export default SingleCartProduct;
