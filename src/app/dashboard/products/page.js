"use client"
import DProductsCards from '@/Components/Pages/Dashboard/DProducts/DProductsCards';
import Loader from '@/Hooks/Loader/Loader';
import { axiosHttp } from '@/app/helper/axiosHttp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoMdAdd } from 'react-icons/io';
import { MdDelete, MdEditSquare } from "react-icons/md";
import "./products.css";


export default function page() {

    const [isLoading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axiosHttp.get(`/products`).then(res => {
            setAllProducts(res.data);
            setLoading(false);
        })
    }, [])

    console.log(allProducts);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className='px-5 pb-5 w-full'>
            <div className="grid grid-cols-4 gap-3 my-3">
                <DProductsCards title={"Total Products"} amount={100} />
                <DProductsCards title={"Active Products"} amount={95} />
                <DProductsCards title={"Inactive Products"} amount={5} />
                <DProductsCards title={"New Products"} amount={5} />
            </div>
            <div className="mb-5 flex justify-between items-center px-3 py-2 bg-[#d5ddda] shadow-lg rounded-lg">
                <Link href={"/dashboard/products"} className="text-xl font-semibold">All Products <span>({allProducts?.length})</span></Link>
                <Link href={"/dashboard/products/add"} className="flex gap-2 items-center bg-white py-2 px-4 rounded-lg font-semibold cursor-pointer">
                    <IoMdAdd className="text-xl" />
                    <span>New Product</span>
                </Link>
            </div>

            {isLoading ? <Loader /> :
                <table className='products-table !w-full bg-white'>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Sell Quantity</th>
                        <th>Actions</th>
                    </tr>
                    {
                        allProducts?.map(p => <tr key={p?._id}>
                            <td><img src={p?.imageUrl?.[0]} alt="img" className='w-12 h-12 mx-auto' /></td>
                            <td>{p?.title?.length > 20 ? <>{p?.title?.slice(0, 20)}..</> : <>{p?.title?.slice(0, 10)}</>}</td>
                            <td>{p?.price}</td>
                            <td>{p?.status?.label}</td>
                            <td>{p?.sellQuantity}</td>
                            <td className=''>
                                <div className="!w-full !h-full flex items-center justify-center gap-2">
                                    <MdDelete className='text-3xl font-bold bg-red-600 text-white rounded-md cursor-pointer p-1' />
                                    <Link href={`/dashboard/products/${p?._id}`}><MdEditSquare className='text-3xl font-bold bg-[#FFC520] text-white rounded-md cursor-pointer p-1' /></Link>
                                    <Link target='_blank' href={`/Collections/${p?.category?.[0]?.label.toLowerCase()}/${p?._id}`}><FaArrowUpRightFromSquare className='text-3xl font-bold bg-green-500 text-white rounded-md cursor-pointer p-1' /></Link>
                                </div>
                            </td>
                        </tr>)
                    }

                </table>
            }
        </div>
    );
}