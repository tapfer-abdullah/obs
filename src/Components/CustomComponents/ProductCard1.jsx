"use client";

import Image from "next/image";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineEuroSymbol } from "react-icons/md";

import "./CustomComponents.css";

const ProductCard1 = ({ img1, img2, price, name }) => {
  return (
    <div className="product-card m-2 space-y-3">
      <div className="Image-cart overflow-hidden relative">
        <div className="image-container transition-all">
          <img src={img1} alt="Product Image1" className="default-image transition-all duration-300" />
          <img src={img2} alt="Product Image2" className="hover-image transition-all duration-700" />
        </div>
        <div className="flex justify-center">
          <div className="product-details transition-all duration-700">
            <div className="flex justify-center items-center gap-5">
              <AiOutlineShopping title="Add to cart" className="text-3xl bg-white rounded-full p-1 cursor-pointer" />
              <HiOutlineViewfinderCircle title="View Details" className="text-3xl bg-white rounded-full p-1 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p>{name}</p>
        <p className="flex items-center justify-center gap-1">
          <MdOutlineEuroSymbol />
          <span>{price}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard1;