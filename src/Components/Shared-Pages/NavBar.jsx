"use client";
import { axiosHttp } from "@/app/helper/axiosHttp";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import ShoppingCart from "../CustomComponents/ShoppingCart/ShoppingCart";
import "./sharedComponents.css";

const NavBar = () => {
  const [positionInfo, setPositionInfo] = useState({ right: "-right-[2000px]", customOpacity: 0 });
  const [type, setType] = useState([]);

  useState(() => {
    axiosHttp.get("/types").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <div className="mobile lg:hidden">mobile</div>
      <div className="hidden md:block md:fixed top-0 left-0 z-50 w-screen">
        <div className="bg-[#31a3a3] text-white font-sans font-semibold flex justify-around py-4 text-xl">
          <Link href="/" className="text-3xl font-semibold uppercase">
            OdbhootStore
          </Link>
          <div className="space-x-4 flex">
            <Link href="/">Home</Link>

            <div className="jewelryOption relative space-y-4">
              <Link href="" className="hover:text-red-500">
                Jewelry
              </Link>
              <div className="jewelryList transition-all duration-500 space-y-4 ">
                <div className="flex flex-col space-y-4 bg-[#31a3a3] p-5 rounded-lg">
                  <Link href="/bracelets" className="hover:text-red-500">
                    Bracelets
                  </Link>
                  <Link href="/bracelets" className="hover:text-red-500">
                    Earrings
                  </Link>
                  <Link href="/bracelets" className="hover:text-red-500">
                    Necklace
                  </Link>
                </div>
              </div>
            </div>

            <div className="clothingOption relative space-y-4">
              <Link href="" className="hover:text-red-500">
                clothing
              </Link>
              <div className="clothingList transition-all duration-500 space-y-4 ">
                <div className="flex flex-col space-y-4 bg-[#31a3a3] p-5 rounded-lg">
                  <Link href="/bracelets" className="hover:text-red-500">
                    Bikinies
                  </Link>
                  <Link href="/bracelets" className="hover:text-red-500">
                    Tops
                  </Link>
                  <Link href="/bracelets" className="hover:text-red-500">
                    Gym
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="flex gap-2">
            <Link href="">
              <AiOutlineShopping
                onClick={() => {
                  setPositionInfo({ right: "right-0", customOpacity: 70 });
                }}
                className="text-3xl"
              />
            </Link>
            <Link href="">
              <IoIosSearch className="text-4xl" />
            </Link>
          </div>
        </div>
      </div>
      <ShoppingCart positionInfo={positionInfo} setPositionInfo={setPositionInfo} />
    </div>
  );
};

export default NavBar;
