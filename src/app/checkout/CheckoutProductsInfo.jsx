"use client";
import SingleCartProduct from "@/Components/CustomComponents/ShoppingCart/SingleCartProduct";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { MdDiscount, MdOutlineEuroSymbol } from "react-icons/md";

const CheckoutProductsInfo = ({ actionOfDis, discountType, discountTypeValue, tip, subTotal, setQuantity, setSubtotal, handleDiscountCode, disError, amountToBeReduce, discountCode }) => {
  const { cartData, changeCartData, setChangeCartData } = useContext(OrderStateProvider);
  const [discountInput, setDiscountInput] = useState("");

  console.log("d", actionOfDis);

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
      {cartData?.map((sp, index) => (
        // <SingleCartProduct handleQuantity={handleQuantity} handleDelete={handleDelete} key={index} data={sp} />
        <div key={index} className="relative flex justify-between items-center space-x-4 my-4">
          <div className="flex justify-start items-center gap-2">
            <div className="relative">
              <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
              <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
            </div>
            <div>
              <h4 className="text-md">{sp?.name}</h4>
              {actionOfDis == "Percentage" && discountType == "category" && discountTypeValue.includes(sp?.category?.toLowerCase()) && (
                <div className="flex justify-between items-center text-base font-normal text-green-600">
                  <div className="flex items-center gap-1">
                    <MdDiscount />
                    <span className="font-semibold">{discountCode}:</span>
                  </div>
                  <p className="flex justify-end items-center gap-1">
                    - <MdOutlineEuroSymbol />
                    <span>
                      {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
                    </span>
                  </p>
                </div>
              )}
              {actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id) && (
                <div className="flex justify-between items-center text-base font-normal text-green-600">
                  <div className="flex items-center gap-1">
                    <MdDiscount />
                    <span className="font-semibold">{discountCode}:</span>
                  </div>
                  <p className="flex justify-end items-center gap-1">
                    - <MdOutlineEuroSymbol />
                    <span>
                      {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="flex justify-end items-center gap-1 pr-2">
            <MdOutlineEuroSymbol />
            {actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id) && (
              <p>{(sp?.price - (parseInt(sp?.price) * amountToBeReduce) / 100) * parseInt(sp?.quantity)}</p>
            )}
            {actionOfDis == "Percentage" && discountType == "category" && discountTypeValue.includes(sp?.category?.toLowerCase()) && (
              <p>{(sp?.price - (parseInt(sp?.price) * amountToBeReduce) / 100) * parseInt(sp?.quantity)}</p>
            )}
            {!discountTypeValue.includes(sp?.id) && !discountTypeValue.includes(sp?.category?.toLowerCase()) && <p>{parseInt(sp?.price) * parseInt(sp?.quantity)}</p>}
          </p>
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
              - <MdOutlineEuroSymbol />
              <span>{amountToBeReduce}</span>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            <span>{subTotal + tip - amountToBeReduce}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductsInfo;
