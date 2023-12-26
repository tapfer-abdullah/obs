import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";

const IDWiseDetails = ({ singleProduct }) => {
  const { title, price, type, size, sku, colors } = singleProduct;
  const [sizes, setSize] = React.useState(0);
  const [selectedColor, setSelectedColor] = useState(singleProduct?.colors ? singleProduct?.colors[0]?.name : "");

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSize = (event, newSize) => {
    setSize(newSize);
  };
  const [selectedItems, setSelectedItems] = useState(1);

  return (
    <div>
      <div className="details-modal-content space-y-5 p-3">
        <div>
          <Link href={"/"} className="uppercase font-medium">
            Odbhootstore
          </Link>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-green-500">In Stock</span>
          <span>Type: {type}</span>
          <span>SKU: {sku}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center justify-start gap-1">
            <MdOutlineEuroSymbol />
            <span>{price}</span>
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

        <div className="space-y-1">
          <p className="text-lg font-semibold w-full">Select Size:</p>

          <ToggleButtonGroup value={sizes} exclusive onChange={handleSize} aria-label="sizes" className="w-full flex-wrap">
            {size?.map((s, index) => (
              <ToggleButton key={index} className="bg-white text-xl font-medium !text-black w-auto border border-2" value={s} aria-label={s}>
                {s}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div>
          <div className="space-y-2">
            <div className="flex items-center justify-center text-lg text-black font-medium gap-2">
              <h2>Colors:</h2>
              <h2>{selectedColor}</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {singleProduct?.colors?.map((color) => (
                <div key={color._id} onClick={() => handleColorClick(color.name)}>
                  <img src={color?.imageUrl} className="w-10 h-10" alt="" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <img src={singleProduct?.colors?.find((color) => color.name === selectedColor)?.imageUrl} style={{ width: "50px" }} />
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
          <Link href={"/checkout"} className="block text-center py-2 px-5 bg-[#FFC520] hover:bg-[#ffd558] transition-all duration-300 hover:shadow-md text-black mx-[1px] w-full font-bold uppercase">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IDWiseDetails;
