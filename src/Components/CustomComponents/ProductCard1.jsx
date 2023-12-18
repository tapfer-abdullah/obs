"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineEuroSymbol } from "react-icons/md";

import "./CustomComponents.css";
import QuickAddToCartModal from "./ProductModals/QuickAddToCartModal";

const ProductCard1 = ({ modalDetails, isActiveModal, setActiveModal }) => {
  const [QuickShop, SetQuickShop] = useState("-top-[1000px]");
  const { img1, img2, price, name } = modalDetails;
  return (
    <div>
      <div className="product-card m-2 space-y-3">
        <div className="Image-cart overflow-hidden relative">
          <div className="image-container transition-all">
            <img src={img1} alt="Product Image1" className="default-image transition-all duration-300" />
            <img src={img2} alt="Product Image2" className="hover-image transition-all duration-700" />
          </div>
          <div className="flex justify-center">
            <div className="product-details transition-all duration-700">
              <div className="flex justify-center items-center gap-5">
                <AiOutlineShopping
                  onClick={() => {
                    SetQuickShop("top-0");
                  }}
                  title="Add to cart"
                  className="text-3xl bg-white rounded-full p-1 cursor-pointer"
                />
                <HiOutlineViewfinderCircle
                  onClick={() => {
                    setActiveModal(!isActiveModal);
                  }}
                  title="View Details"
                  className="text-3xl bg-white rounded-full p-1 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className={`absolute z-30 ${QuickShop} transition-all duration-500 left-0 right-0 w-[300px] h-[420px]`}>
            <QuickAddToCartModal QuickShop={QuickShop} SetQuickShop={SetQuickShop}></QuickAddToCartModal>
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
    </div>
  );
};

export default ProductCard1;
