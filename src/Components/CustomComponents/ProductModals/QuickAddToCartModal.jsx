"use client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "../CustomComponents.css";

const QuickAddToCartModal = ({ details, QuickShop, SetQuickShop }) => {
  const [selectedItems, setSelectedItems] = useState(0);
  const [size, setSize] = React.useState(0);

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  return (
    <div className="relative flex justify-center pt-10 items-center w-[300px] h-[420px] bg-white bg-opacity-80">
      <div>
        <RxCross2
          onClick={() => {
            SetQuickShop("-top-[1000px]");
          }}
          className="absolute top-2 right-2 text-3xl font-bold cursor-pointer"
        />
      </div>
      <div className="space-y-5">
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="text-2xl font-bold flex items-center justify-start gap-1">
            <MdOutlineEuroSymbol />
            <span>50.00</span>
          </div>
          <div className="text-2xl font-bold flex items-center justify-start gap-1">
            <span>Colors: </span>
            <select name="colors" id="" className="border border-2 border-gray-900 rounded-md text-lg ">
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
          </div>
        </div>

        <div className="size-container">
          <p className="mt-2 text-center text-lg font-semibold">Select Size:</p>
          {/* <div className=" relative flex gap-1 my-3">
            <div className="relative w-10 mr-5">
              <input type="radio" id="size-s" name="size" value="s" />
              <label htmlFor="size-s">S</label>
            </div>
            <div className="relative w-10 mr-3">
              <input type="radio" id="size-m" name="size" value="m" />
              <label htmlFor="size-m">M</label>
            </div>
            <div className="relative w-10 mr-5">
              <input type="radio" id="size-l" name="size" value="l" />
              <label htmlFor="size-l">L</label>
            </div>
          </div> */}

          <ToggleButtonGroup value={size} exclusive onChange={handleSize} aria-label="tips" className="w-full flex-wrap justify-center gap-2">
            <ToggleButton className="bg-white text-xl font-medium text-black" value="s" aria-label="S">
              S
            </ToggleButton>
            <ToggleButton className="bg-white text-xl font-medium text-black" value="M" aria-label="M">
              M
            </ToggleButton>
            <ToggleButton className="bg-white text-xl font-medium text-black" value="xl" aria-label="xl">
              XL
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="my-20">
            <div className="flex-grow">
              <button className="py-2 px-5 bg-black text-white mx-[1px] uppercase w-full">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddToCartModal;
