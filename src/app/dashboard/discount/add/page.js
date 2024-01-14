"use client"
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Select from 'react-select';

const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Deactive", label: "Deactive" }
]


const page = () => {
    const [discountType, setDiscountType] = useState("");
    const [title, setTitle] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({});
    console.log(discountType);


    const handleSave = () => {

    }

    const handleDiscard = () => {

    }

    const handleChangeDiscountType = (e) => {
        setDiscountType(e.target.value)
    }



    return (
        <div className='px-5 pb-5 w-full'>
            <div className="mb-5 flex justify-between items-center px-3 py-2 bg-[#d5ddda] shadow-lg rounded-lg">
                <div className='flex items-center gap-2'>
                    <Link href={"/dashboard/discount"} className="text-xl font-semibold">All Discount Codes</Link>
                    <IoIosArrowForward />
                    <h4 className="text-xl font-semibold text-blue-500">Create discount code</h4>
                </div>

                <div className='flex items-center gap-2'>
                    <button disabled={title.length == 0} onClick={handleDiscard} className={`flex gap-2 items-center bg-[#FFC520] ${title.length == 0 ? "opacity-50" : "hover:bg-opacity-80"} py-2 px-4 rounded-lg font-semibold cursor-pointer`}>Discard</button>
                    <button disabled={title.length == 0} onClick={handleSave} className={`flex gap-2 items-center bg-green-500 ${title.length == 0 ? "opacity-50" : "hover:bg-opacity-80"} py-2 px-4 rounded-lg font-semibold cursor-pointer`}>Save</button>
                </div>
            </div>

            {/* discount form */}
            <div className="space-y-5 w-4/5 mx-auto">
                <div className='mb-5'>
                    <img src="https://i.ibb.co/wQh5YJz/percentage.png" alt="" className='w-20 mx-auto' />
                    <h4 className="text-xl font-semibold text-center">Create new discount code</h4>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md flex items-center gap-2">
                    <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                        <span>
                            Title * <small>( name )</small>
                        </span>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" name="name" id="name"
                            className="rounded-md w-full border border-gray-300 px-2 py-[5px] outline-1 outline-[#0086fe]" placeholder='Enter title..' />

                    </div>
                    <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                        <span>
                            Status * <small>(Active, Draft)</small>
                        </span>
                        <Select onChange={(selectedOptions) => setSelectedStatus(selectedOptions)}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select status.."
                            isClearable={false}
                            isSearchable={true}
                            name="status"
                            options={statusOptions}
                        />
                    </div>
                </div>
                <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md flex flex-col justify-center items-center'>
                    <h3 className='text-lg font-semibold'>Select Discount Type</h3>
                    {/* <div className='w-full border-b-2 border-black'></div> */}
                    <RadioGroup
                        onChange={handleChangeDiscountType}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="BxGy" control={<Radio />} label="But X Get Y" />
                        <FormControlLabel value="AOffP" control={<Radio />} label="Amount off product" />
                        <FormControlLabel value="AOffO" control={<Radio />} label="Amount off order" />
                        <FormControlLabel value="FS" control={<Radio />} label="Free Shipping" />
                    </RadioGroup>
                </div>

                { // on amount
                    discountType == "AOffO" && <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                        <h3 className='text-lg font-semibold text-center text-blue-500'>Amount off order</h3>
                        <div className="flex items-center gap-2">

                            <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                                <span>
                                    Discount Category * <small>(Fixed / Percentage)</small>
                                </span>
                                <Select
                                    // onChange={(selectedOptions) => setSelectedStatus(selectedOptions)}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select discount value.."
                                    isClearable={false}
                                    isSearchable={true}
                                    name="discountCategory"
                                    options={[
                                        { value: "Fixed", label: "Fixed" },
                                        { value: "Percentage", label: "Percentage" }
                                    ]}
                                />
                            </div>
                            <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                                <span>
                                    Amount * <small>(Fixed / Percentage)</small>
                                </span>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} required type="number" name="Amount" id="Amount"
                                    className="rounded-md w-full border border-gray-300 px-2 py-[5px] outline-1 outline-[#0086fe]" placeholder='Enter discount amount..' />

                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
};

export default page;