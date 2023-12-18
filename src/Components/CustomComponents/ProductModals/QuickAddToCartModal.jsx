"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import demoImg from "../../../Assects/ux.png";
import "../CustomComponents.css";
import DetailsModalImage from "./DetailsModalImage";

const QuickAddToCartModal = ({ details, QuickShop, SetQuickShop }) => {
  const [selectedItems, setSelectedItems] = useState(0);

  return (
    <div className="relative flex justify-center pt-10 items-center w-[300px] h-[420px] bg-white bg-opacity-90">
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
          <div className=" relative flex gap-1 my-3">
            <div className="relative w-10 mr-5">
              <input type="radio" id="size-s" name="size" value="s" />
              <label for="size-s">S</label>
            </div>
            <div className="relative w-10 mr-3">
              <input type="radio" id="size-m" name="size" value="m" />
              <label for="size-m">M</label>
            </div>
            <div className="relative w-10 mr-5">
              <input type="radio" id="size-l" name="size" value="l" />
              <label for="size-l">L</label>
            </div>
          </div>

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
