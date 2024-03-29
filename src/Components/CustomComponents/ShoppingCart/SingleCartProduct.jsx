"use client";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const SingleCartProduct = ({ data, handleQuantity, handleDelete }) => {
  const [selectedItems, setSelectedItems] = useState(data?.quantity || 1);
  return (
    <div className="relative flex justify-between items-center space-x-4 my-3 shadow-md">
      <img src={data?.img} alt="product img" className="w-20 h-24" />
      <div className="flex flex-col gap-2 items-start flex-grow">
        <h4 className="text-md">{data?.name}</h4>
        <div className="flex justify-between items-center space-x-3 pb-1">
          <div className="text-xl font-bold">
            <button
              onClick={() => {
                if (selectedItems > 1) {
                  handleQuantity(data?.id, data?.size, data?.img, selectedItems - 1);
                  setSelectedItems(selectedItems - 1);
                }
              }}
              className="py-1 px-2 bg-slate-300 mx-[1px]"
            >
              -
            </button>
            <button className="py-1 px-2 bg-slate-300 mx-[1px]">{selectedItems}</button>
            <button
              onClick={() => {
                handleQuantity(data?.id, data?.size, data?.img, selectedItems + 1);
                setSelectedItems(selectedItems + 1);
              }}
              className="py-1 px-2 bg-slate-300 mx-[1px]"
            >
              +
            </button>
          </div>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <p>{data?.price}</p>
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          handleDelete(data?.id, data?.size, data?.img);
        }}
        className="absolute top-[30%] right-2 hover:bg-red-300 bg-red-500 text-white p-2 rounded-full transition-all duration-300"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default SingleCartProduct;
