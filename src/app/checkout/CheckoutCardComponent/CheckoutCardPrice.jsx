"use client";

import { MdDiscount } from "react-icons/md";

import React, { useEffect } from "react";

export const CheckoutCardPrice = ({ disAdditionalType, discountCode, cardSize, setMinusAmount, sp, discountOn, discountOnValue, amountToBeReduce, discountType }) => {
  const price = parseInt(sp?.price);
  const quantity = parseInt(sp?.quantity);

  useEffect(() => {
    switch (disAdditionalType) {
      case "BxGy": {
        console.log("type bxgy");
        break;
      }
      //AOffO -> amount off on product or category
      case "AOffP": {
        if (discountOn === "products") {
          if (discountOnValue.includes(sp?.id)) {
            if (discountType === "Percentage") {
              const discountedPrice = ((price * amountToBeReduce) / 100) * quantity;
              setMinusAmount((prevAmount) => prevAmount + discountedPrice);
            } else {
              setMinusAmount((prevAmount) => prevAmount + amountToBeReduce * quantity);
            }
          }
        } else if (discountOn === "category") {
          if (discountOnValue.includes(sp?.category?.toLowerCase())) {
            if (discountType === "Percentage") {
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
        console.log(disAdditionalType, discountType);
        // if (discountType === "Percentage") {
        //   const discountedPrice = ((price * amountToBeReduce) / 100) * quantity;
        //   setMinusAmount((prevAmount) => prevAmount + discountedPrice);
        // } else {
        //   setMinusAmount((prevAmount) => prevAmount + amountToBeReduce * quantity);
        // }
        break;
      }
    }
  }, [setMinusAmount, discountType, discountOn, discountOnValue, sp?.id, sp?.category?.toLowerCase(), price, amountToBeReduce, discountCode, cardSize, quantity]);

  //   if (discountType == "Percentage" && discountOn == "products") {
  //     if (discountOnValue.includes(sp?.id)) {
  //       return (
  //         <div className="">
  //           <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
  //           <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
  //         </div>
  //       );
  //     } else {
  //       return <p>€ {price * quantity}</p>;
  //     }
  //   } else if (discountType == "Percentage" && discountOn == "category") {
  //     if (discountOnValue.includes(sp?.category?.toLowerCase())) {
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
  if (discountOn === "products") {
    if (discountOnValue.includes(sp?.id)) {
      if (discountType === "Percentage") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
          </div>
        );
      } else if (discountType === "Fixed") {
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
  } else if (discountOn === "category") {
    if (discountOnValue.includes(sp?.category?.toLowerCase())) {
      if (discountType === "Percentage") {
        return (
          <div className="">
            <p className="line-through text-lg text-red-700 font-semibold">€ {price * quantity}</p>
            <p>€ {(price - (price * amountToBeReduce) / 100) * quantity}</p>
          </div>
        );
      } else if (discountType === "Fixed") {
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

export const CheckoutCardDiscount = ({ disAdditionalType, sp, discountOn, discountOnValue, amountToBeReduce, discountType, discountCode }) => {
  if (discountType == "Percentage" && discountOn == "category") {
    if (discountOnValue.includes(sp?.category?.toLowerCase())) {
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
  } else if (discountType == "Percentage" && discountOn == "products" && discountOnValue.includes(sp?.id)) {
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

  // 2222222222222
  if (discountOn === "products") {
    if (discountOnValue.includes(sp?.id)) {
      if (discountType === "Percentage") {
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
      } else if (discountType === "Fixed") {
        return (
          <div className="flex justify-between items-center text-base font-normal text-green-600">
            <div className="flex items-center gap-1">
              <MdDiscount />
              <span className="font-semibold">{discountCode}:</span>
            </div>
            <p>
              € {parseInt(sp?.quantity)} x {amountToBeReduce}
            </p>
          </div>
        );
      } else {
        // return <p>€ {price * quantity}</p>;
      }
    } else {
      // return <p>€ {price * quantity}</p>;
    }
  } else if (discountOn === "category") {
    if (discountOnValue.includes(sp?.category?.toLowerCase())) {
      if (discountType === "Percentage") {
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
      } else if (discountType === "Fixed") {
        return (
          <div className="flex justify-between items-center text-base font-normal text-green-600">
            <div className="flex items-center gap-1">
              <MdDiscount />
              <span className="font-semibold">{discountCode}:</span>
            </div>
            <p>
              € {parseInt(sp?.quantity)} x {amountToBeReduce}
            </p>
          </div>
        );
      } else {
        // return <p>€ {price * quantity}</p>;
      }
    } else {
      // return <p>€ {price * quantity}</p>;
    }
  } else {
    // return <p>€ {price * quantity}</p>;
  }
};
