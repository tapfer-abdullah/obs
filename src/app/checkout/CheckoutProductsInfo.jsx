"use client";
import SingleCartProduct from "@/Components/CustomComponents/ShoppingCart/SingleCartProduct";
import { OrderStateProvider } from "@/Components/State/OrderState";
import React, { useContext, useEffect, useState } from "react";
import { MdDiscount, MdOutlineEuroSymbol } from "react-icons/md";
import { CheckoutCardDiscount, CheckoutCardPrice } from "./CheckoutCardComponent/CheckoutCardPrice";

const CheckoutProductsInfo = ({
  minusAmount,
  setMinusAmount,
  actionOfDis,
  discountType,
  discountTypeValue,
  tip,
  subTotal,
  setQuantity,
  setSubtotal,
  handleDiscountCode,
  disError,
  amountToBeReduce,
  discountCode,
  disAdditionalType,
}) => {
  const { cartData } = useContext(OrderStateProvider);
  const [discountInput, setDiscountInput] = useState("");

  console.log("d", actionOfDis, amountToBeReduce);

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

  // const myCheckoutCard = () => {
  //   <div key={index} className="relative flex justify-between items-center space-x-4 my-4">
  //     <div className="flex justify-start items-center gap-2">
  //       <div className="relative">
  //         <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
  //         <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
  //       </div>
  //       <div>
  //         <div>
  //           <h4 className="text-md">{sp?.name}</h4>
  //           <p className="text-sm text-gray-500 py-1 capitalize">
  //             {sp?.color} / {sp?.size}
  //           </p>
  //         </div>
  //         {actionOfDis == "Percentage" && discountType == "category" && discountTypeValue.includes(sp?.category?.toLowerCase()) && (
  //           <div className="flex justify-between items-center text-base font-normal text-green-600">
  //             <div className="flex items-center gap-1">
  //               <MdDiscount />
  //               <span className="font-semibold">{discountCode}:</span>
  //             </div>
  //             <p className="flex justify-end items-center gap-1">
  //               - <MdOutlineEuroSymbol />
  //               <span>
  //                 {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //         {actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id) && (
  //           <div className="flex justify-between items-center text-base font-normal text-green-600">
  //             <div className="flex items-center gap-1">
  //               <MdDiscount />
  //               <span className="font-semibold">{discountCode}:</span>
  //             </div>
  //             <p className="flex justify-end items-center gap-1">
  //               - <MdOutlineEuroSymbol />
  //               <span>
  //                 {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <div className="flex justify-end items-center gap-1 pr-2">
  //       {/* <MdOutlineEuroSymbol /> */}
  //       {actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id) && (
  //         <div className="">
  //           <p className="line-through text-lg text-red-700 font-semibold">€ {parseInt(sp?.price) * parseInt(sp?.quantity)}</p>
  //           <p>€ {(sp?.price - (parseInt(sp?.price) * amountToBeReduce) / 100) * parseInt(sp?.quantity)}</p>
  //         </div>
  //       )}
  //       {actionOfDis == "Percentage" && discountType == "category" && discountTypeValue.includes(sp?.category?.toLowerCase()) && (
  //         <div className="">
  //           <p className="line-through text-lg text-red-700 font-semibold">€ {parseInt(sp?.price) * parseInt(sp?.quantity)}</p>
  //           <p>€ {(sp?.price - (parseInt(sp?.price) * amountToBeReduce) / 100) * parseInt(sp?.quantity)}</p>
  //         </div>
  //       )}
  //       {!discountTypeValue.includes(sp?.id) && !discountTypeValue.includes(sp?.category?.toLowerCase()) && <p>€ {parseInt(sp?.price) * parseInt(sp?.quantity)}</p>}
  //       {actionOfDis == "Fixed" && <p>€ {parseInt(sp?.price) * parseInt(sp?.quantity)}</p>}
  //     </div>
  //   </div>;
  // };

  return (
    <div className="bg-[#f5f5f5] -mt-5 p-10 border-l-2">
      {cartData?.map((sp, index) => (
        <div key={index}>
          <div className={`relative flex justify-between items-center space-x-4 my-4`}>
            <div className="flex justify-start items-center gap-2">
              <div className="relative">
                <img src={sp?.img} alt="product img" className="w-16 h-16 rounded-md" />
                <p className="absolute -top-3 -right-2 text-white text-sm bg-gray-500 rounded-full px-[8px] py-[2px]">{sp?.quantity}</p>
              </div>
              <div>
                <div>
                  <h4 className="text-md">{sp?.name}</h4>
                  <p className="text-sm text-gray-500 py-1 capitalize">
                    {sp?.color} / {sp?.size}
                  </p>
                </div>
                <CheckoutCardDiscount
                  sp={sp}
                  discountType={discountType}
                  discountTypeValue={discountTypeValue}
                  amountToBeReduce={amountToBeReduce}
                  actionOfDis={actionOfDis}
                  discountCode={discountCode}
                  disAdditionalType={disAdditionalType}
                ></CheckoutCardDiscount>
              </div>
            </div>
            <div className="flex justify-end items-center gap-1 pr-2">
              <CheckoutCardPrice
                disAdditionalType={disAdditionalType}
                minusAmount={minusAmount}
                setMinusAmount={setMinusAmount}
                sp={sp}
                discountType={discountType}
                discountTypeValue={discountTypeValue}
                amountToBeReduce={amountToBeReduce}
                actionOfDis={actionOfDis}
                discountCode={discountCode}
                cardSize={cartData?.length}
              ></CheckoutCardPrice>
            </div>
          </div>
          <div className={`border-b-2 my-1 ${cartData?.length - 1 == index ? "hidden" : "block"}`}></div>
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
              - <MdOutlineEuroSymbol />
              {disAdditionalType != "AOffO" && <span>{minusAmount}</span>}
              {disAdditionalType == "AOffO" && (actionOfDis == "Fixed" ? <span>{amountToBeReduce}</span> : <span>{(subTotal * parseInt(amountToBeReduce)) / 100}</span>)}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <p className="flex justify-end items-center gap-1">
            <MdOutlineEuroSymbol />
            {disAdditionalType != "AOffO" && <span>{subTotal + tip - minusAmount}</span>}
            {disAdditionalType == "AOffO" &&
              (actionOfDis == "Fixed" ? <span>{subTotal + tip - amountToBeReduce}</span> : <span>{subTotal + tip - (subTotal * parseInt(amountToBeReduce)) / 100}</span>)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductsInfo;
