"use client";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import SingleCartProduct from "./SingleCartProduct";

const ShoppingCart = ({ positionInfo, setPositionInfo }) => {
  const { cartData, changeCartData, setChangeCartData } = useContext(OrderStateProvider);

  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartData.length; i++) {
      sum += cartData[i].price * cartData[i].quantity;
    }
    setSubtotal(sum);
  }, [cartData]);

  const handleQuantity = (id, size, img, quantity) => {
    let sum = 0;
    let newData = [];
    let storedData = JSON.parse(localStorage.getItem("obs-cart")) || [];

    for (let i = 0; i < storedData.length; i++) {
      if (storedData?.[i]?.id == id && storedData?.[i]?.size == size && storedData?.[i]?.img == img) {
        let data = storedData?.[i];
        data.quantity = quantity;
        newData.push(data);
      } else {
        newData.push(storedData[i]);
      }
      sum += newData[i].price * newData[i].quantity;
    }
    localStorage.setItem("obs-cart", [JSON.stringify(newData)]);
    setChangeCartData(changeCartData + 1);
    setSubtotal(sum);
  };

  const handleDelete = (id, size, img) => {
    let newData = [];
    let storedData = JSON.parse(localStorage.getItem("obs-cart")) || [];

    for (let i = 0; i < storedData.length; i++) {
      if (storedData?.[i]?.id == id && storedData?.[i]?.size == size && storedData?.[i]?.img == img) {
        //noting to do
      } else {
        newData.push(storedData[i]);
      }
    }
    localStorage.setItem("obs-cart", [JSON.stringify(newData)]);
    setChangeCartData(changeCartData + 1);
  };

  return (
    <div
      //   onClick={() => {
      //     setPositionInfo({ right: "-right-[2000px]", customOpacity: 0 });
      //   }}
      className={`fixed z-30 top-16 ${positionInfo?.right} w-screen h-screen bg-[#f5f5f5] bg-opacity-70 transition-all duration-500`}
    >
      <div className={`absolute z-40 ${positionInfo?.right} w-[26%] h-full bg-white shadow-lg opacity-100 py-10 pr-5 pl-7 transition-all duration-500`}>
        <RxCross2
          onClick={() => {
            setPositionInfo({ right: "-right-[2000px]", customOpacity: 0 });
          }}
          className="absolute top-7 right-3 text-2xl font-semibold cursor-pointer"
        />
        <p className="absolute top-3 left-3 text-4xl font-light cursor-pointer">Cart</p>

        <div className="pt-12 relative h-full">
          {/* cart items  */}
          <div className="h-1/2 overflow-y-scroll">
            {cartData?.map((sp, index) => (
              <SingleCartProduct handleQuantity={handleQuantity} handleDelete={handleDelete} key={index} data={sp} />
            ))}
          </div>
          <div className="absolute bottom-6 w-full space-y-4 bg-white">
            <div className="border-b-2"></div>
            <div className="flex justify-between items-center">
              <span>SUBTOTAL:</span>
              <p className="flex justify-end items-center gap-1">
                <MdOutlineEuroSymbol />
                <span>{subTotal}</span>
              </p>
            </div>
            <p className="text-base">USE DISCOUNT CODE HERE</p>
            <form className="relative">
              <input type="text" name="discount-code" id="" placeholder="Discount code" className="border-2 border-black p-2 w-full" />
              <button type="submit" className="absolute top-0 right-0 bg-black hover:bg-opacity-90 transition-all duration-300 text-white p-2 border-2 border-black">
                Apply
              </button>
            </form>
            <button className="bg-black text-white p-3 w-full font-semibold hover:bg-opacity-90 transition-all duration-300">CHECK OUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
