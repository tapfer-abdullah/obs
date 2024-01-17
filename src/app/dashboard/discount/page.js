"use client"
import Loader from '@/Hooks/Loader/Loader';
import { axiosHttp } from '@/app/helper/axiosHttp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';

const page = () => {
    const [discountCodes, setDiscountCodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosHttp.get(`/discount`).then(res => {
            console.log(res.data)
            setDiscountCodes(res.data);
            setLoading(false);
        })
            .catch(error => {
                console.log(error.message)
            })
    }, [])

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

            <div>
                {
                    loading && <Loader />
                }
                {
                    discountCodes?.length > 0 && discountCodes?.map(d => <div key={d?._id}
                        className='bg-white my-3 py-2 px-4 border-2 rounded-lg shadow-md flex justify-between items-center'>

                        <Link href={`/dashboard/discount/${d?._id}`} className='inline-block flex-grow'>
                            <h3>
                                <span className='text-lg font-semibold'>{d?.title}</span>
                                <span className='text-sm mx-1'>({d?.status?.label})</span>
                            </h3>
                            <p className='text-md mt-1 text-gray-700'><span>Used: <span>{d?.used}</span></span></p>
                        </Link>
                        <div className='flex gap-2 items-center'>
                            <Link href={`/dashboard/discount/${d?._id}`} target='_blank' className='px-4 py-1 font-semibold bg-gray-300 hover:bg-gray-400 flex items-center gap-1 border-2 rounded-3xl transition-all duration-300'>
                                <TiEdit className='text-lg' />
                                <p>Edit</p>
                            </Link>
                            <button onClick={() => { handleDelete(d?._id) }} className='py-2 px-4 font-semibold text-white bg-red-500 hover:bg-red-600 flex items-center gap-1 border-2 rounded-3xl transition-all duration-300'>
                                <MdDeleteForever className='text-lg' />
                                <p>Delete</p>
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default page;