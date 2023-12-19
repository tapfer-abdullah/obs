import React from "react";

const CheckoutPersonalInfo = () => {
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
        <input type="email" name="email" id="email" className="rounded-md w-full border-2 p-2" placeholder="Email" />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="checkedEmail" id="checkedEmail" />
          <label htmlFor="checkedEmail">Email me with news and offers</label>
        </div>
      </div>

      <div className="space-y-2 mt-8">
        <h4 className="text-xl font-semibold">Delivery Information</h4>

        <input type="text" name="country" id="country" className="rounded-md w-full border-2 p-2" placeholder="Country / Region" />
        <div className="flex items-center gap-2">
          <input type="text" name="firstName" id="firstName" className="rounded-md w-full border-2 p-2" placeholder="First name" />
          <input type="text" name="lastName" id="lastName" className="rounded-md w-full border-2 p-2" placeholder="Last name" />
        </div>
        <input type="text" name="address" id="address" className="rounded-md w-full border-2 p-2" placeholder="Address" />
        <input type="text" name="apartment" id="apartment" className="rounded-md w-full border-2 p-2" placeholder="Apartment / suite / etc." />
        <div className="flex items-center gap-2">
          <input type="text" name="postalCode" id="postalCode" className="rounded-md w-full border-2 p-2" placeholder="Postal code" />
          <input type="text" name="city" id="city" className="rounded-md w-full border-2 p-2" placeholder="City" />
        </div>
        <input type="text" name="address" id="address" className="rounded-md w-full border-2 p-2" placeholder="Phone number" />
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
      <div className="border-2 border-[#f5f5f5] rounded-md ">
        <p className="p-3 border-b-2 border-[#f5f5f5]">Show your support for the team at ODBHOOTSTORE</p>
        <div className="bg-[#f5f5f5] p-4 space-y-3">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, magni.</p>
          <p>Thank you, we appreciate it.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPersonalInfo;
