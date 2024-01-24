"use client";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { MdDiscount, MdOutlineEuroSymbol } from "react-icons/md";
import BxGyCart from "./CheckoutCardComponent/BxGyCart";
import CheckoutPageCart from "./CheckoutCardComponent/CheckoutPageCart";

const CheckoutProductsInfo = ({
  minusAmount,
  setMinusAmount,
  discountType,
  discountOn,
  discountOnValue,
  tip,
  subTotal,
  setQuantity,
  setSubtotal,
  handleDiscountCode,
  disError,
  amountToBeReduce,
  discountCode,
  disAdditionalType,
  BuyOnOption,
  BuyOnValue,
  BxGyType,
  BxGyCartArray,
}) => {
  const { cartData } = useContext(OrderStateProvider);
  const [discountInput, setDiscountInput] = useState("");

  useEffect(() => {
    let sum = 0;
    let quantity = 0;
    for (let i = 0; i < cartData.length; i++) {
      sum += cartData[i].price * cartData[i].quantity;
      quantity += cartData[i].quantity;
    }
    setSubtotal(sum);
    setQuantity(quantity);
  }, [cartData]);

  return (
    <div className="bg-[#f5f5f5] -mt-5 p-10 border-l-2">
      {cartData
        ?.sort((a, b) => b.price - a.price)
        ?.map((sp, index) => (
          <div key={index}>
            <CheckoutPageCart
              disAdditionalType={disAdditionalType}
              minusAmount={minusAmount}
              setMinusAmount={setMinusAmount}
              sp={sp}
              discountOn={discountOn}
              discountOnValue={discountOnValue}
              amountToBeReduce={amountToBeReduce}
              discountType={discountType}
              discountCode={discountCode}
              BuyOnOption={BuyOnOption}
              BuyOnValue={BuyOnValue}
              BxGyType={BxGyType}
            ></CheckoutPageCart>

            <div className={`border-b-2 my-1 ${cartData?.length - 1 == index ? "hidden" : "block"}`}></div>
          </div>
        ))}

      {disAdditionalType == "BxGy" &&
        BxGyCartArray?.map((sp, index) => (
          <div key={index}>
            <BxGyCart
              data={{
                sp,
              }}
            ></BxGyCart>
            <div className={`border-b-2 my-1 ${BxGyCartArray?.length - 1 == index ? "hidden" : "block"}`}></div>
          </div>
        ))}

      <div className="relative mt-7">
        <input
          onBlur={(e) => {
            setDiscountInput(e.target.value);
          }}
          type="text"
          name="discount-code"
          id=""
          placeholder="Discount code"
          className={`border-2 p-2 w-full outline-[#e7e7e7] outline-4 ${disError ? "border-red-600" : "border-[#e7e7e7]"}`}
        />
        <button
          onClick={() => {
            setMinusAmount(0);
            handleDiscountCode(discountInput);
          }}
          className="absolute top-0 right-0 bg-[#d0d0d0] hover:bg-opacity-90 transition-all duration-300 text-black font-semibold p-2 border-2 border-[#d0d0d0]"
        >
          Apply
        </button>
        {disError && <p className="text-red-600 text-sm py-1">{disError}</p>}
      </div>

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
        {discountCode && (
          <div className="flex justify-between items-center text-base font-normal text-green-600">
            <div className="flex items-center gap-1">
              <MdDiscount />
              <span className="font-semibold">{discountCode}:</span>
            </div>
            <p className="flex justify-end items-center gap-1">
              <FiMinus /> <MdOutlineEuroSymbol />
              {disAdditionalType != "AOffO" && <span>{minusAmount}</span>}
              {disAdditionalType == "AOffO" && (discountType == "Fixed" ? <span>{amountToBeReduce}</span> : <span>{(subTotal * parseInt(amountToBeReduce)) / 100}</span>)}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            {disAdditionalType != "AOffO" && <span>{subTotal + tip - minusAmount}</span>}
            {disAdditionalType == "AOffO" &&
              (discountType == "Fixed" ? <span>{subTotal + tip - amountToBeReduce}</span> : <span>{subTotal + tip - (subTotal * parseInt(amountToBeReduce)) / 100}</span>)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductsInfo;
