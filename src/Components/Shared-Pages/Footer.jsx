"use client";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaCcMastercard, FaCcPaypal, FaCcVisa, FaLocationDot, FaPhone, FaRegCopyright } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";

import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-10 xl:px-5 flex flex-col xl:flex-row justify-between gap-6 pt-10 pb-2">
        <div className="flex flex-col space-y-2 w-1/4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <Link href="">Shop</Link>
          <Link href="">Affiliate Program</Link>
          <Link href="">FAQ</Link>
        </div>
        <div className="flex flex-col space-y-2 w-1/4">
          <h4 className="text-lg font-semibold">Important Info</h4>
          <Link href="">About Us</Link>
          <Link href="">Privacy policy</Link>
          <Link href="">Refound Policy</Link>
          <Link href="">Shipping policy</Link>
          <Link href="">Terms of service</Link>
        </div>
        <div className="flex flex-col space-y-2 w-1/4">
          <h1 className="text-lg font-semibold">Contact Info</h1>
          <Link href="">Contact Us</Link>
          <p className="flex gap-2 items-start">
            <FaLocationDot className="mt-1" />
            <span>2 FREDERICK STREETKINGS CROSS, LONDON WC1X 0ND</span>
          </p>
          <p className="flex gap-2 items-center">
            <FaPhone />
            <span>+447888886977</span>
          </p>
          <p className="flex gap-2 items-center">
            <MdEmail />
            <span>odbhootstore@gmail.com</span>
          </p>
          <FaInstagram className="text-3xl" />
        </div>
        <div className="flex flex-col space-y-2 w-1/4">
          <h4 className="text-lg font-semibold">Sing Up Save</h4>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals</p>
          <form className="relative">
            <input type="email" name="email" id="" className="w-full border border-black rounded-md px-2 py-2" placeholder="Subscribe to our offer" />
            <span className="absolute right-0 top-0 px-2 py-2 bg-black text-white rounded-e-md cursor-pointer">Sing UP</span>
          </form>
        </div>
      </div>
      <div className="py-3 flex justify-between items-center">
        <p className="flex gap-2 items-center">
          <FaRegCopyright />
          <span> 2023 Odbhootstore</span>
        </p>
        <div className="flex gap-2 items-center text-3xl text-black">
          <FaCcPaypal />
          <FaCcVisa />
          <FaCcMastercard />
          <SiAmericanexpress />
        </div>
      </div>
    </div>
  );
};

export default Footer;
