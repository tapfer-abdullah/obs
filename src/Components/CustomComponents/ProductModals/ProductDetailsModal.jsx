"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "../CustomComponents.css";
import DetailsModalImage from "./DetailsModalImage";

const ProductDetailsModal = ({ singleProduct, handleClose }) => {
  const { _id, title, description, price, type, size, sku, colors } = singleProduct;
  const [sizes, setSize] = React.useState(0);
  const [selectedColor, setSelectedColor] = useState(singleProduct.colors[0].name);
  const [imgIndex, setImgIndex] = useState(0);

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  // left btn
  const leftSlider = () => {
    if (imgIndex - 1 < 0) {
      setImgIndex(singleProduct?.colors?.length - 1);
    } else {
      setImgIndex(imgIndex - 1);
    }
  };

  // right btn
  const rightSlider = () => {
    if (imgIndex + 1 == singleProduct?.colors?.length) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  };

  const [selectedItems, setSelectedItems] = useState(1);

  return (
    <div className="relative w-full mt-[7%] bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="">
        <DetailsModalImage setImgIndex={setImgIndex} rightSlider={rightSlider} leftSlider={leftSlider} imgIndex={imgIndex} singleProduct={singleProduct} id={_id} />
        <RxCross2 onClick={handleClose} className="absolute top-2 right-2 text-xl font-bold cursor-pointer" />
      </div>

      <div className="details-modal-content space-y-5">
        <div>
          <Link href={"/"} className="uppercase font-medium">
            Odbhootstore
          </Link>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-green-500">In Stock</span>
          <span>Type: {type[0]?.label}</span>
          <span>SKU: {sku}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center justify-start gap-1">
            <MdOutlineEuroSymbol />
            <span>{price}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center text-lg text-black font-medium gap-2">
              <h2>Colors:</h2>
              <h2>{singleProduct?.colors?.[imgIndex]?.name}</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {singleProduct?.colors?.map((color, index) => (
                <div key={color._id} onClick={() => setImgIndex(index)} className={`border-[3px] p-[1px] ${index == imgIndex ? " border-black" : "border-white"}`}>
                  <img src={color?.imageUrl} className="w-10 h-10 cursor-pointer" alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold w-full">Select Size:</p>

          <ToggleButtonGroup value={sizes} exclusive onChange={handleSize} aria-label="sizes" className="w-full flex-wrap gap-2">
            {size?.map((s) => (
              <ToggleButton key={s?._id} className="bg-white text-xl font-medium !text-black w-auto" value={s?.label} aria-label={s?.label}>
                {s?.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
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
              <button className="py-2 px-5 bg-[#d3e3fd] mx-[1px]">{selectedItems}</button>
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
              <button className="py-2 px-5 bg-black text-white mx-[1px] uppercase w-full">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
