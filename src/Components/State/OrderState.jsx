"use client";
import { axiosHttp } from "@/app/helper/axiosHttp";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const OrderStateProvider = createContext();

const OrderState = ({ children }) => {
  const [changeCartData, setChangeCartData] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [category, setCategory] = useState([]);
  const [allCountryData, setAllCountryData] = useState([]);
  const [dataForBxGy, setDataForBxGy] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("obs-cart"));
    let storedDataXY = JSON.parse(localStorage.getItem("obs-cart-xy")) || [];
    setCartData(cart);
    setDataForBxGy(storedDataXY);

    // let dataArray = [];
    // cartData?.forEach((sp) => {
    //   console.log(sp?.quantity);
    //   if (sp?.quantity > 1) {
    //     for (let i = 0; i < sp?.quantity; i++) {
    //       let obj = sp;
    //       obj.quantity = 1;
    //       dataArray.push(obj);
    //     }
    //   } else {
    //     dataArray.push(sp);
    //   }
    // });
    // setDataForBxGy(dataArray);
  }, [changeCartData]);

  useEffect(() => {
    axiosHttp
      .get(`/collections`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log("Category in OrderState page: ", error.message);
      });
  }, []);

  useEffect(() => {
    let countryData = [];
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      // console.log(res.data)

      for (let i = 0; i < res.data.length; i++) {
        if (!countryData.includes({ value: res.data?.[i]?.cca2 })) {
          let data = { label: res.data?.[i]?.name?.common, imageUrl: res.data?.[i]?.flags?.png, value: res.data?.[i]?.cca2 };
          countryData.push(data);
        }
      }
      setAllCountryData(countryData);
    });
  }, []);

  const info = { cartData, dataForBxGy, setCartData, changeCartData, setChangeCartData, category, allCountryData };
  return <OrderStateProvider.Provider value={info}>{children}</OrderStateProvider.Provider>;
};

export default OrderState;
