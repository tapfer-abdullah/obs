"use client";

import { MdDiscount } from "react-icons/md";

import React, { useEffect } from "react";

export const CheckoutCardPrice = ({ disAdditionalType, discountCode, cardSize, setMinusAmount, sp, discountType, discountTypeValue, amountToBeReduce, actionOfDis }) => {
  const price = parseInt(sp?.price);
  const quantity = parseInt(sp?.quantity);

  console.log(disAdditionalType);

  useEffect(() => {
    switch (disAdditionalType) {
      case "BxGy": {
        console.log("type bxgy");
        break;
      }
      //AOffO -> amount off on product or category
      case "AOffP": {
        if (discountType === "products") {
          if (discountTypeValue.includes(sp?.id)) {
            if (actionOfDis === "Percentage") {
              const discountedPrice = ((price * amountToBeReduce) / 100) * quantity;
              setMinusAmount((prevAmount) => prevAmount + discountedPrice);
            } else {
              setMinusAmount((prevAmount) => prevAmount + amountToBeReduce * quantity);
            }
          }
        } else if (discountType === "category") {
          if (discountTypeValue.includes(sp?.category?.toLowerCase())) {
            if (actionOfDis === "Percentage") {
              const discountedPrice = ((price * amountToBeReduce) / 100) * quantity;
              setMinusAmount((prevAmount) => prevAmount + discountedPrice);
            } else {
              setMinusAmount((prevAmount) => prevAmount + amountToBeReduce * quantity);
            }
          }
        }
        break;
      }
      case "AOffO": {
        console.log(disAdditionalType, actionOfDis);
        // if (actionOfDis === "Percentage") {
        //   const discountedPrice = ((price * amountToBeReduce) / 100) * quantity;
        //   setMinusAmount((prevAmount) => prevAmount + discountedPrice);
        // } else {
        //   setMinusAmount((prevAmount) => prevAmount + amountToBeReduce * quantity);
        // }
        break;
      }
    }
  }, [setMinusAmount, actionOfDis, discountType, discountTypeValue, sp?.id, sp?.category?.toLowerCase(), price, amountToBeReduce, discountCode, cardSize, quantity]);

  //   if (actionOfDis == "Percentage" && discountType == "products") {
  //     if (discountTypeValue.includes(sp?.id)) {
  //       return (
  //         <div className="">
  //           <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
  //           <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
  //         </div>
  //       );
  //     } else {
  //       return <p>€ {price * quantity}</p>;
  //     }
  //   } else if (actionOfDis == "Percentage" && discountType == "category") {
  //     if (discountTypeValue.includes(sp?.category?.toLowerCase())) {
  //       return (
  //         <div className="">
  //           <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
  //           <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
  //         </div>
  //       );
  //     } else {
  //       return <p>€ {price * quantity}</p>;
  //     }
  //   } else {
  //     return <p>€ {price * quantity}</p>;
  //   }

  // amount off on product or category
  if (discountType === "products") {
    if (discountTypeValue.includes(sp?.id)) {
      if (actionOfDis === "Percentage") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
          </div>
        );
      } else if (actionOfDis === "Fixed") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - amountToBeReduce) * quantity}</p>
          </div>
        );
      } else {
        return <p>€ {price * quantity}</p>;
      }
    } else {
      return <p>€ {price * quantity}</p>;
    }
  } else if (discountType === "category") {
    if (discountTypeValue.includes(sp?.category?.toLowerCase())) {
      if (actionOfDis === "Percentage") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
          </div>
        );
      } else if (actionOfDis === "Fixed") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - amountToBeReduce) * quantity}</p>
          </div>
        );
      } else {
        return <p>€ {price * quantity}</p>;
      }
    } else {
      return <p>€ {price * quantity}</p>;
    }
  } else {
    return <p>€ {price * quantity}</p>;
  }
};

export const CheckoutCardDiscount = ({ disAdditionalType, sp, discountType, discountTypeValue, amountToBeReduce, actionOfDis, discountCode }) => {
  if (actionOfDis == "Percentage" && discountType == "category") {
    if (discountTypeValue.includes(sp?.category?.toLowerCase())) {
      return (
        <div className="flex justify-between items-center text-base font-normal text-green-600">
          <div className="flex items-center gap-1">
            <MdDiscount />
            <span className="font-semibold">{discountCode}:</span>
          </div>
          <p>
            € {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
          </p>
        </div>
      );
    }
  } else if (actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id)) {
    return (
      <div className="flex justify-between items-center text-base font-normal text-green-600">
        <div className="flex items-center gap-1">
          <MdDiscount />
          <span className="font-semibold">{discountCode}:</span>
        </div>
        <p>
          € {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
        </p>
      </div>
    );
  }

  //   <div>
  //     <div>
  //       <h4 className="text-md">{sp?.name}</h4>
  //       <p className="text-sm text-gray-500 py-1 capitalize">
  //         {sp?.color} / {sp?.size}
  //       </p>
  //     </div>

  {
    /* {actionOfDis == "Percentage" && discountType == "category" && discountTypeValue.includes(sp?.category?.toLowerCase()) && (
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
    )} */
  }
  // {actionOfDis == "Percentage" && discountType == "products" && discountTypeValue.includes(sp?.id) && (
  //   <div className="flex justify-between items-center text-base font-normal text-green-600">
  //     <div className="flex items-center gap-1">
  //       <MdDiscount />
  //       <span className="font-semibold">{discountCode}:</span>
  //     </div>
  //     <p className="flex justify-end items-center gap-1">
  //       - <MdOutlineEuroSymbol />
  //       <span>
  //         {parseInt(sp?.quantity)} x {(parseInt(sp?.price) * amountToBeReduce) / 100}
  //       </span>
  //     </p>
  //   </div>
  // )}
  //   </div>;
};
