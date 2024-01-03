"use client"
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward, IoMdAdd } from 'react-icons/io';

const page = () => {

    return (
        <div className='p-5'>
            <div className="mb-5 flex justify-between items-center px-3 py-2 bg-[#d5ddda] shadow-lg rounded-lg">
                <Link href={"/dashboard/theme/pages"} className="text-xl font-semibold">Pages</Link>
                <Link href={"/dashboard/theme/pages/add"} className="flex gap-2 items-center bg-white py-2 px-4 rounded-lg font-semibold cursor-pointer">
                    <IoMdAdd className="text-xl" />
                    <span>New Page</span>
                </Link>
            </div>
        </div >
    );
};

export default page;