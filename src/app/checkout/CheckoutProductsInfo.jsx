import SingleCartProduct from "@/Components/CustomComponents/ShoppingCart/SingleCartProduct";
import React from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";

const CheckoutProductsInfo = () => {
  return (
    <div className="bg-[#f5f5f5] -mt-5 p-10 border-l-2">
      <SingleCartProduct />
      <SingleCartProduct />
      <SingleCartProduct />
      <SingleCartProduct />

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
            <span>50.00</span>
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
            <span>50.00</span>
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
