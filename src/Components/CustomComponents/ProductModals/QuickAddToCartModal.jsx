"use client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "../CustomComponents.css";

const QuickAddToCartModal = ({ singleProduct, QuickShop, SetQuickShop }) => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [sizes, setSize] = React.useState(0);

  const { price, size, colors } = singleProduct;

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  const [selectedColor, setSelectedColor] = useState(singleProduct?.colors?.[0]?.name);

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
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
            <span>{price}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center text-lg text-black font-medium gap-2">
              <h2>Colors:</h2>
              <h2>{selectedColor}</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {singleProduct.colors.map((color) => (
                <div key={color._id} onClick={() => handleColorClick(color.name)}>
                  <img src={color?.imageUrl} className="w-10 h-10 cursor-pointer" alt="color-wise-img" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="size-container">
          <p className="mt-2 text-center text-lg font-semibold">Select Size:</p>
          <ToggleButtonGroup
            value={sizes}
            exclusive
            onChange={() => {
              handleSize();
            }}
            aria-label="sizes"
            className="w-full flex justify-center flex-wrap"
          >
            {size?.map((s) => (
              <ToggleButton
                key={s?._id}
                onClick={(e) => {
                  setSelectedSize(e.target.value);
                }}
                className={`${s?.label === selectedSize ? "!bg-black !text-white" : "!bg-white !text-black"} !px-3 !py-1   !text-lg !font-medium !w-auto border !border-2`}
                value={s?.label}
                aria-label={s?.label}
              >
                {s?.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <div className="my-5">
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
