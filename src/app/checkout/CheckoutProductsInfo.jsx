"use client";
import SingleCartProduct from "@/Components/CustomComponents/ShoppingCart/SingleCartProduct";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";

const CheckoutProductsInfo = ({ tip, subTotal, setSubtotal }) => {
  const { cartData, changeCartData, setChangeCartData } = useContext(OrderStateProvider);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartData.length; i++) {
      sum += cartData[i].price * cartData[i].quantity;
    }
    setSubtotal(sum);
  }, [cartData]);

  return (
    <div className="bg-[#f5f5f5] -mt-5 p-10 border-l-2">
      {cartData?.map((sp, index) => (
        // <SingleCartProduct handleQuantity={handleQuantity} handleDelete={handleDelete} key={index} data={sp} />
        <div key={index} className="relative flex justify-between items-center space-x-4 my-4">
          <div className="flex justify-start items-center gap-2">
            <div className="relative">
              <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
              <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
            </div>
            <h4 className="text-md">{sp?.name}</h4>
          </div>
          <p className="flex justify-end items-center gap-1 pr-2">
            <MdOutlineEuroSymbol />
            <p>{sp?.price}</p>
          </p>
        </div>
      ))}

      <form className="relative mt-7">
        <input type="text" name="discount-code" id="" placeholder="Discount code" className="border-2 border-[#e7e7e7] p-2 w-full outline-[#e7e7e7] outline-4" />
        <button type="submit" className="absolute top-0 right-0 bg-[#d0d0d0] hover:bg-opacity-90 transition-all duration-300 text-black font-semibold p-2 border-2 border-[#d0d0d0]">
          Apply
        </button>
      </form>

      <div className="space-y-2 mt-5">
        <div className="flex justify-between items-center text-base font-normal">
          <span>SUBTOTAL:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>{subTotal}</span>
          </p>
        </div>
        <div className="flex justify-between items-center text-base font-normal">
          <span>Shipping:</span>
          <p>Free</p>
        </div>
        {tip > 0 && (
          <div className="flex justify-between items-center text-base font-normal">
            <span>Tip:</span>
            <p className="flex justify-end items-center gap-1">
              <MdOutlineEuroSymbol />
              <span>{tip}</span>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>{subTotal + tip}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductsInfo;
