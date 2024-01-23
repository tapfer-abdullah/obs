"use client";
import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { MdDiscount } from "react-icons/md";

const BxGyCart = ({ data }) => {
  const { index, BxGyMaxUsesPerOrder, discountTypeValue, setCusShouldGet, approvedGetArray, discountCode, sp, approvedGetCount, approvedBuyCount, CusBuyAmount, CusGetAmount, discountType } = data;
  let cusShouldGet = 0;
  for (let i = 1; i <= approvedBuyCount && i * CusBuyAmount + i * CusGetAmount <= approvedGetCount; i++) {
    cusShouldGet = i * CusGetAmount;
  }

  useEffect(() => {
    setCusShouldGet(cusShouldGet);
  }, [cusShouldGet, approvedBuyCount, sp?.quantity]);

  if (approvedGetArray?.includes(sp?.id) && cusShouldGet > index && index < BxGyMaxUsesPerOrder) {
    if (discountType === "free") {
      return (
        <div className={`relative flex justify-between items-center space-x-4 my-4`}>
          <div className="flex justify-start items-center gap-2">
            <div className="relative">
              <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
              <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
            </div>

            <div>
              <h4 className="text-md">{sp?.name}</h4>
              <p className="text-sm text-gray-500 py-1 capitalize">
                {sp?.color} / {sp?.size}
              </p>

              <div className="flex justify-start items-center gap-1 text-base font-normal text-green-600">
                <MdDiscount />
                <span className="font-semibold">{discountCode} </span> <span>(Free)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="line-through text-lg text-red-700 font-semibold">€ {sp?.price}</p>
            <p className="text-green-600">Free</p>
          </div>
        </div>
      );
    } else if (discountType == "percentage") {
      return (
        <div className={`relative flex justify-between items-center space-x-4 my-4`}>
          <div className="flex justify-start items-center gap-2">
            <div className="relative">
              <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
              <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
            </div>

            <div>
              <h4 className="text-md">{sp?.name}</h4>
              <p className="text-sm text-gray-500 py-1 capitalize">
                {sp?.color} / {sp?.size}
              </p>

              <div className="flex justify-start items-center gap-1 text-base font-normal text-green-600">
                <MdDiscount />
                <span className="font-semibold">{discountCode} </span> <span>(- €{(sp?.price * discountTypeValue) / 100})</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="line-through text-lg text-red-700 font-semibold">€ {sp?.price}</p>
            <p>€ {sp?.price - (sp?.price * discountTypeValue) / 100}</p>
          </div>
        </div>
      );
    } else if (discountType == "amount") {
      return (
        <div className={`relative flex justify-between items-center space-x-4 my-4`}>
          <div className="flex justify-start items-center gap-2">
            <div className="relative">
              <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
              <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
            </div>

            <div>
              <h4 className="text-md">{sp?.name}</h4>
              <p className="text-sm text-gray-500 py-1 capitalize">
                {sp?.color} / {sp?.size}
              </p>

              <div className="flex justify-start items-center gap-1 text-base font-normal text-green-600">
                <MdDiscount />
                <span className="font-semibold">{discountCode} </span> <span>(- €{discountTypeValue})</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="line-through text-lg text-red-700 font-semibold">€ {sp?.price}</p>
            <p>€ {sp?.price - discountTypeValue}</p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={`relative flex justify-between items-center space-x-4 my-4`}>
        <div className="flex justify-start items-center gap-2">
          <div className="relative">
            <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
            <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
          </div>
          <div>
            <h4 className="text-md">{sp?.name}</h4>
            <p className="text-sm text-gray-500 py-1 capitalize">
              {sp?.color} / {sp?.size}
            </p>
          </div>
        </div>
        <p className="">€ {sp?.price}</p>
      </div>
    );
  }
};

export default BxGyCart;
