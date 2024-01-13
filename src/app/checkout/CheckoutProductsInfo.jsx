"use client";
import SingleCartProduct from "@/Components/CustomComponents/ShoppingCart/SingleCartProduct";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";

const CheckoutProductsInfo = ({ tip }) => {
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
    <div className="bg-[#f5f5f5] -mt-5 p-10 border-l-2">
      {cartData?.map((sp, index) => (
        <SingleCartProduct handleQuantity={handleQuantity} handleDelete={handleDelete} key={index} data={sp} />
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
        <div className="flex justify-between items-center text-base font-normal">
          <span>Tip:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>{tip}</span>
          </p>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>50.00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductsInfo;
