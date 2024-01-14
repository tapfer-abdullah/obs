import Link from 'next/link';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const page = () => {
    return (
        <div className='px-5 pb-5 w-full'>
            <div className="mb-5 flex justify-between items-center px-3 py-2 bg-[#d5ddda] shadow-lg rounded-lg">
                <h1 className="text-xl font-semibold">All Discount Codes <span>({0})</span></h1>
                <div className="flex items-center gap-3 px-2">
                    <Link href={"/dashboard/discount/add"} className="flex gap-2 items-center bg-white p-2 rounded-lg font-semibold cursor-pointer">
                        <IoMdAdd className="text-xl" />
                        <span>New Discount Code</span>
                    </Link>

                    <select
                        defaultValue={"FilterDiscount"}
                        // onChange={(e) => setFilterOption(e.target.value)}
                        name="filterDiscountCode"
                        id="filterDiscountCode"
                        className="py-2 pl-2 pr-5 text-lg font-semibold outline-0 rounded-md cursor-pointer"
                    >
                        <option disabled value="FilterDiscount">Filter Discount Codes</option>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default page;