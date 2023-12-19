import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";

const IDWiseDetails = () => {
  const [selectedItems, setSelectedItems] = useState(1);
  return (
    <div>
      <div className="details-modal-content space-y-5 p-3">
        <div>
          <Link href={"/"} className="uppercase font-medium">
            Odbhootstore
          </Link>
          <h3 className="text-xl font-semibold">Seamless Fitness Yoga Wear Shorts Set</h3>
        </div>
        <div className="flex justify-between items-center">
          <span>In Stock</span>
          <span>Type: GYM</span>
          <span>SKU: CJNS102226001AZ</span>
        </div>
        <div className="flex justify-between items-center">
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

        <div>
          <p className="mt-2 text-lg font-semibold">Select Size:</p>
          <div className="size-container relative flex gap-1 mb-3">
            <p className="my-2 text-lg font-semibold"></p>
            <div className="relative w-10 mr-3">
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
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xl font-bold mt-10">
            <div className="text-xl font-bold">
              <button
                onClick={() => {
                  setSelectedItems(selectedItems - 1);
                }}
                className="py-2 px-5 bg-slate-300 mx-[1px]"
              >
                -
              </button>
              <button className="py-2 px-5 bg-slate-100 mx-[1px]">{selectedItems}</button>
              <button
                onClick={() => {
                  setSelectedItems(selectedItems + 1);
                }}
                className="py-2 px-5 bg-slate-300 mx-[1px]"
              >
                +
              </button>
            </div>
            <div className="flex-grow">
              <button className="py-2 px-5 bg-black text-white hover:bg-[#363634] transition-all duration-300 hover:shadow-lg mx-[1px] uppercase w-full">Add to Cart</button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="py-2 px-5 bg-[#FFC520] hover:bg-[#ffd558] transition-all duration-300 hover:shadow-md text-black mx-[1px] w-full font-bold uppercase">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default IDWiseDetails;
