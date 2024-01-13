"use client";
import React, { createContext, useEffect, useState } from "react";

export const OrderStateProvider = createContext();

const OrderState = ({ children }) => {
  const [changeCartData, setChangeCartData] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("obs-cart"));
    setCartData(cart);
  }, [changeCartData]);

  const info = { cartData, setCartData, changeCartData, setChangeCartData };
  return <OrderStateProvider.Provider value={info}>{children}</OrderStateProvider.Provider>;
};

export default OrderState;
