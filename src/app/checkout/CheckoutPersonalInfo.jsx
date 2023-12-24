"use client";
import TextField from "@mui/material/TextField";
import "./checkout.css";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";

const CheckoutPersonalInfo = () => {
  const [tip, setTip] = React.useState(0);

  const handleTips = (event, newTip) => {
    setTip(newTip);
    console.log(newTip);
  };

  return (
    <div className="px-8">
      <div className="space-y-2">
        <div className="flex justify-between items-center my-2">
          <h4 className="text-xl font-semibold">Contact</h4>
          <div className="flex items-center gap-1">
            <p>Have an account?</p>
            <p className="underline text-blue-500">Login</p>
          </div>
        </div>

        <TextField required type="email" name="email" id="email" className="rounded-md w-full border-2 h-auto" label="Email" />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="checkedEmail" id="checkedEmail" />
          <label htmlFor="checkedEmail">Email me with news and offers</label>
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <h4 className="text-xl font-semibold">Delivery Information</h4>

        <TextField required type="text" name="country" id="country" className="rounded-md w-full border-2" label="Country / Region" />
        <div className="flex items-center gap-2">
          <TextField required type="text" name="firstName" id="firstName" className="rounded-md w-full border-2 " label="First name" />
          <TextField required type="text" name="lastName" id="lastName" className="rounded-md w-full border-2 " label="Last name" />
        </div>
        <TextField required type="text" name="address" id="address" className="rounded-md w-full border-2" label="Address" />
        <TextField required type="text" name="apartment" id="apartment" className="rounded-md w-full border-2" label="Apartment / suite / etc." />
        <div className="flex items-center gap-2">
          <TextField required type="text" name="postalCode" id="postalCode" className="rounded-md w-full border-2 " label="Postal code" />
          <TextField required type="text" name="city" id="city" className="rounded-md w-full border-2 " label="City" />
        </div>
        <TextField type="text" name="address" id="address" className="rounded-md w-full border-2" label="Phone number" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input type="checkbox" name="saveInfo" id="saveInfo" />
        <label htmlFor="saveInfo">Save this information for next time</label>
      </div>
      <h4 className="text-xl font-semibold mt-7 mb-2 ">Shipping method</h4>
      <div className="flex justify-between items-center p-3 bg-[#d3e3fd] rounded-md">
        <p>Standard</p>
        <p>Free</p>
      </div>

      <h4 className="text-xl font-semibold mt-7 mb-2 ">Add tip</h4>
      <div className="border border-[#d0d0d0] rounded-md ">
        <p className="p-3 border-b border-[#d0d0d0]">Show your support for the team at ODBHOOTSTORE</p>
        <div className="bg-[#f5f5f5] p-4 space-y-3">
          <ToggleButtonGroup value={tip} exclusive onChange={handleTips} aria-label="tips" className="w-full mx-auto space-x-2">
            <ToggleButton className="bg-white w-1/4 text-xl font-medium text-black" value="5" aria-label="tip5">
              5%
            </ToggleButton>
            <ToggleButton className="bg-white w-1/4 text-xl font-medium text-black" value="10" aria-label="tip10">
              10%
            </ToggleButton>
            <ToggleButton className="bg-white w-1/4 text-xl font-medium text-black" value="15" aria-label="tip15">
              15%
            </ToggleButton>
            <ToggleButton className="bg-white w-1/4 text-xl font-medium text-black" value="0" aria-label="tip0">
              None
            </ToggleButton>
          </ToggleButtonGroup>

          <form className="relative mt-7">
            <input type="number" name="discount-code" id="" placeholder="Custom tip" className="border-2 border-[#e7e7e7] p-2 pr-20 w-full outline-[#e7e7e7] outline-4" />
            <button type="submit" className="absolute top-0 right-0 bg-[#d0d0d0] hover:bg-opacity-90 transition-all duration-300 text-black font-semibold p-2 border-2 border-[#d0d0d0]">
              Add tip
            </button>
          </form>

          <p>Thank you, we appreciate it.</p>
        </div>
      </div>
      <button className="text-xl text-white font-semibold p-2 my-5 w-full bg-black rounded-md hover:bg-opacity-70 transition-all duration-300">Pay Now</button>
    </div>
  );
};

export default CheckoutPersonalInfo;
