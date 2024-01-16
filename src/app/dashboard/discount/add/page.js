"use client"
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Select from 'react-select';


import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Deactive", label: "Deactive" }
]

const eligibilityList = [
    { value: "New-customers", label: "New-customers" },
    { value: "Old-customers", label: "Old-customers" }
]


const page = () => {
    const [title, setTitle] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({});
    const [discountType, setDiscountType] = useState("");

    const [minPhrReqOption, setMinPhrReqOption] = useState("no");
    const [minPhrReqValue, setMinPhrReqValue] = useState(0);

    const [eligibilityOption, setEligibilityOption] = useState("all");
    const [eligibilityValue, setEligibilityValue] = useState({});

    const [limitDisOption, setLimitDisOption] = useState(false);
    const [limitDisValue, setLimitDisValue] = useState(1);
    const [limitDisOnePerUse, setLimitDisOnePerUse] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [isEndTime, setIsEndTime] = useState(false);
    const [EndDate, setEndDate] = useState("");
    const [EndTime, setEndTime] = useState("");

    const [disCategoryOption, setDisCategoryOption] = useState("");;
    const [disCategoryValue, setDisCategoryValue] = useState(0);

    const [selectCatOrProd, setSelectCatOrProd] = useState({});
    const [selectCatOrProdArray, setSelectCatOrProdArray] = useState([]);

    const [freeShipping, setFreeShipping] = useState("all");
    const [freeShippingCountries, setFreeShippingCountries] = useState([]);
    const [shippingRateOPOption, setShippingRateOPOption] = useState(false);
    const [shippingRateOPValue, setShippingRateOPValue] = useState(0);

    const [BxGyType, setBxGyType] = useState("buys");
    const [BxGyCusBuyAmount, setBxGyCusBuyAmount] = useState(0);
    const [BxGyCusGetAmount, setBxGyCusGetAmount] = useState(0);

    const [BxGyDiscountedOption, setBxGyDiscountedOption] = useState("free");
    const [BxGyDiscountedValue, setBxGyDiscountedValue] = useState(0);

    const [BxGyMaxUserOption, setBxGyMaxUserOption] = useState(false);
    const [BxGyMaxUserValue, setBxGyMaxUserValue] = useState(0);


    const handleSave = () => {

    }
    const handleDiscard = () => {

    }

    return (
        <div className='px-5 pb-16 w-full'>
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
                {/* Discount type */}
                <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md flex flex-col justify-center items-center'>
                    <h3 className='text-lg font-semibold'>Select Discount Code Type</h3>
                    {/* <div className='w-full border-b-2 border-black'></div> */}
                    <RadioGroup
                        onChange={(e) => setDiscountType(e.target.value)}
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
            </div>

            {
                discountType && <div className="mt-5 space-y-5 w-4/5 mx-auto">
                    {/* Title & status */}
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

                    {//no:1 Buy x Get y
                        discountType == "BxGy" && <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                            <h3 className='text-md font-semibold'>Customers {BxGyType}</h3>
                            <RadioGroup value={BxGyType}
                                onChange={(e) => { setBxGyType(e.target.value); setMinPhrReqValue(0) }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="buys" control={<Radio />} label="Minimum quantity of items" />
                                <FormControlLabel value="spends" control={<Radio />} label="Minimum purchase amount" />

                                <div className='space-y-3 mt-2'>
                                    <div className='grid grid-cols-3 gap-3 justify-center items-center'>
                                        <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                                            <span>
                                                {BxGyType == "buys" ? "Quantity" : "Amount"}
                                            </span>
                                            <input onChange={(e) => setBxGyCusBuyAmount(e.target.value)} required min={0} type="number" name="name" id="name"
                                                className="rounded-md w-full border border-gray-300 px-2 py-[5px] outline-1 outline-[#0086fe]" placeholder='Enter value..' />

                                        </div>
                                        <div className="col-span-2 !w-full space-y-1">
                                            <span>
                                                Any items from
                                            </span>
                                            <Select
                                                onChange={(selectedOptions) => setSelectCatOrProd(selectedOptions)}
                                                className="basic-single z-20"
                                                classNamePrefix="select"
                                                placeholder="Select category / products"
                                                isClearable={false}
                                                isSearchable={true}
                                                name="discountCategory"
                                                options={[
                                                    { value: "category", label: "Specific Categories" },
                                                    { value: "products", label: "Specific Products" }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Select
                                            onChange={(selectedOptions) => setSelectCatOrProdArray(selectedOptions)}
                                            isMulti
                                            isClearable={false}
                                            name={`${disCategoryOption}`}
                                            className="basic-multi-select"
                                            placeholder={`Select...`}
                                            options={[
                                                { value: "A", label: "A" },
                                                { value: "B", label: "B" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className='w-full mt-5 py-3'>
                                    <h3 className='text-md font-semibold'>Customer gets</h3>
                                    <p className='py-3 text-gray-500'>Customers must add the quantity of items specified below to their cart.</p>
                                </div>

                                <div className='space-y-3'>
                                    <div className='grid grid-cols-3 gap-3 justify-center items-center'>
                                        <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                                            <span>
                                                {BxGyType == "buys" ? "Quantity" : "Amount"}
                                            </span>
                                            <input onChange={(e) => setBxGyCusGetAmount(e.target.value)} required min={0} type="number" name="name" id="name"
                                                className="rounded-md w-full border border-gray-300 px-2 py-[5px] outline-1 outline-[#0086fe]" placeholder='Enter value..' />

                                        </div>
                                        <div className="col-span-2 !w-full space-y-1">
                                            <span>
                                                Any items from
                                            </span>
                                            <Select
                                                onChange={(selectedOptions) => setSelectCatOrProd(selectedOptions)}
                                                className="basic-single z-20"
                                                classNamePrefix="select"
                                                placeholder="Select category / products"
                                                isClearable={false}
                                                isSearchable={true}
                                                name="discountCategory"
                                                options={[
                                                    { value: "category", label: "Specific Categories" },
                                                    { value: "products", label: "Specific Products" }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Select
                                            onChange={(selectedOptions) => setSelectCatOrProdArray(selectedOptions)}
                                            isMulti
                                            isClearable={false}
                                            name={`${disCategoryOption}`}
                                            className="basic-multi-select"
                                            placeholder={`Select...`}
                                            options={[
                                                { value: "A", label: "A" },
                                                { value: "B", label: "B" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className='mt-5'>
                                    <h3 className='text-md font-medium'>At a discounted value</h3>
                                    <RadioGroup value={BxGyDiscountedOption}
                                        onChange={(e) => { setBxGyDiscountedOption(e.target.value) }}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="percentage" control={<Radio />} label="Percentage" />
                                        {
                                            BxGyDiscountedOption == "percentage" && <div className='ml-7 space-y-1'>
                                                <input onBlur={(e) => setBxGyDiscountedValue(e.target.value)} min={0} type="number" name="" id="minPhrReqValue" placeholder={`Enter value..`} className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                            </div>
                                        }
                                        <FormControlLabel value="amount" control={<Radio />} label="Amount off each" />
                                        {
                                            BxGyDiscountedOption == "amount" && <div className='ml-7 space-y-1'>
                                                <input onBlur={(e) => setBxGyDiscountedValue(e.target.value)} min={0} type="number" name="" id="minPhrReqValue" placeholder={`Enter value..`} className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                            </div>
                                        }
                                        <FormControlLabel value="free" control={<Radio />} label="Free" />
                                    </RadioGroup>
                                </div>

                                <p className='border-t border-gray-300 w-full my-3'></p>

                                <div>
                                    <FormControlLabel className='block' control={<Checkbox onChange={(e) => { setBxGyMaxUserOption(e.target.checked) }} />} label="Set a maximum number of uses per order" />
                                    {
                                        BxGyMaxUserOption && <div className='ml-7'>
                                            <input onBlur={(e) => setBxGyMaxUserValue(e.target.value)} min={1} type="number" name="" id="minPhrReqValue" placeholder='Enter value..' className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                        </div>
                                    }
                                </div>


                            </RadioGroup>

                        </div>
                    }

                    { //no:2 & 3 amount off on product/order
                        (discountType == "AOffP" || discountType == "AOffO") && <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                            {/* common field */}
                            <div className="flex items-center gap-2">
                                <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                                    <span>
                                        Discount Category * <small>(Fixed / Percentage)</small>
                                    </span>
                                    <Select
                                        onChange={(selectedOptions) => setDisCategoryOption(selectedOptions)}
                                        value={disCategoryOption}
                                        className="basic-single !z-20"
                                        classNamePrefix="select"
                                        placeholder="Select discount type.."
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
                                    <input onChange={(e) => setDisCategoryValue(e.target.value)} required type="number" name="Amount" id="Amount"
                                        className="rounded-md w-full border border-gray-300 px-2 py-[5px] outline-1 outline-[#0086fe]" placeholder='Enter discount amount..' />

                                </div>
                            </div>
                            {/* field for order 2 */}
                            {
                                discountType == "AOffP" && <div className='mt-3 space-y-2'>
                                    <h3 className='text-md font-medium'>Applies to</h3>
                                    <Select
                                        onChange={(selectedOptions) => setSelectCatOrProd(selectedOptions)}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select category / products"
                                        isClearable={false}
                                        isSearchable={true}
                                        name="discountCategory"
                                        options={[
                                            { value: "category", label: "Specific Categories" },
                                            { value: "products", label: "Specific Products" }
                                        ]}
                                    />

                                    <Select
                                        onChange={(selectedOptions) => setSelectCatOrProdArray(selectedOptions)}
                                        isMulti
                                        isClearable={false}
                                        name={`${disCategoryOption}`}
                                        className="basic-multi-select"
                                        placeholder={`Select...`}
                                        options={[
                                            { value: "A", label: "A" },
                                            { value: "B", label: "B" }
                                        ]}
                                    />
                                </div>
                            }
                        </div>
                    }

                    { //no:4 | Free shipping
                        discountType == "FS" && <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                            <h3 className='text-md font-semibold'>Countries</h3>
                            <RadioGroup value={freeShipping}
                                onChange={(e) => { setFreeShipping(e.target.value) }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="all" control={<Radio />} label="All countries" />
                                <FormControlLabel value="specific" control={<Radio />} label="Selected countries" />
                            </RadioGroup>
                            {freeShipping == "specific" &&
                                <div className='mt-3 space-y-2'>
                                    <Select
                                        onChange={(selectedOptions) => setFreeShippingCountries(selectedOptions)}
                                        className="basic-single z-20"
                                        classNamePrefix="select"
                                        placeholder="Select countries.."
                                        isClearable={false}
                                        isSearchable={true}
                                        name="freeShippingCountry"
                                        options={[
                                            { value: "c1", label: "Bangladesh" },
                                            { value: "c3", label: "All over the world" }
                                        ]}
                                    />
                                </div>
                            }
                            <h3 className='text-md font-medium mt-4'>Shipping rates</h3>
                            <FormControlLabel control={<Checkbox onChange={(e) => { setShippingRateOPOption(e.target.checked) }} />} label="Exclude shipping rates over a certain amount" />
                            {
                                shippingRateOPOption && <div className='ml-7 space-y-1'>
                                    <input onBlur={(e) => setShippingRateOPValue(e.target.value)} min={0} type="number" name="" id="shippingRateOPValue" placeholder={`Enter amount..`} className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                    <br />
                                    <label className='text-sm text-gray-500' htmlFor="minPhrReqValue">Over how much € discount code will apply.</label>
                                </div>
                            }
                        </div>
                    }

                    {/* common options: Minimum purchase requirement */}
                    <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                        <h3 className='text-md font-semibold'>Minimum purchase requirement</h3>
                        <RadioGroup value={minPhrReqOption}
                            onChange={(e) => { setMinPhrReqOption(e.target.value); setMinPhrReqValue(0) }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="no" control={<Radio />} label="No minimum requirements" />
                            <FormControlLabel value="amount" control={<Radio />} label="Minimum purchase amount (€)" />
                            {
                                minPhrReqOption == "amount" && <div className='ml-7 space-y-1'>
                                    <input onBlur={(e) => setMinPhrReqValue(e.target.value)} min={0} type="number" name="" id="minPhrReqValue" placeholder={`Enter ${minPhrReqOption}..`} className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                    <br />
                                    <label className='text-sm text-gray-500' htmlFor="minPhrReqValue">Applies only to selected collections.</label>
                                </div>
                            }
                            <FormControlLabel value="items" control={<Radio />} label="Minimum quantity of items" />
                            {
                                minPhrReqOption == "items" && <div className='ml-7 space-y-1'>
                                    <input onBlur={(e) => setMinPhrReqValue(e.target.value)} min={0} type="number" name="" id="minPhrReqValue" placeholder={`Enter ${minPhrReqOption}..`} className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                                    <br />
                                    <label className='text-sm text-gray-400' htmlFor="minPhrReqValue">Applies only to selected collections.</label>
                                </div>
                            }
                        </RadioGroup>

                    </div>

                    {/* Customer eligibility */}
                    <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                        <h3 className='text-md font-semibold'>Customer eligibility</h3>
                        <RadioGroup value={eligibilityOption}
                            onChange={(e) => { setEligibilityOption(e.target.value) }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All customers" />
                            <FormControlLabel value="specific" control={<Radio />} label="Specific customer segments" />
                        </RadioGroup>
                        {
                            eligibilityOption == "specific" && <div className="ml-7 space-y-1 w-full">
                                <Select onChange={(selectedOptions) => setEligibilityValue(selectedOptions)}
                                    className="basic-single w-1/4 "
                                    classNamePrefix="select"
                                    placeholder="Select.."
                                    isClearable={false}
                                    isSearchable={true}
                                    name="eligibilityValue"
                                    options={eligibilityList}
                                />
                                <label className='text-sm' htmlFor="eligibilityValue">Applies only to selected collections.</label>
                            </div>
                        }
                    </div>

                    {/* Uses of discount code */}
                    <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md'>
                        <h3 className='text-md font-semibold'>Maximum discount uses</h3>
                        <FormControlLabel className='block' control={<Checkbox onChange={(e) => { setLimitDisOption(e.target.checked) }} />} label="Limit number of times this discount can be used in total" />
                        {
                            limitDisOption && <div className='ml-7'>
                                <input onBlur={(e) => setLimitDisValue(e.target.value)} min={1} type="number" name="" id="minPhrReqValue" placeholder='Enter value..' className='w-1/4 py-1 px-2 outline-1 outline-[#0086fe] border border-gray-300 rounded-md' />
                            </div>
                        }
                        <FormControlLabel className='block' control={<Checkbox onChange={(e) => { setLimitDisOnePerUse(e.target.checked) }} />} label="Limit to one use per customer" />

                    </div>

                    {/* Active dates */}
                    <div className='bg-white p-5 rounded-xl border border-[#d5ddda] shadow-md space-y-2'>
                        <h3 className='text-md font-semibold mb-5'>Active dates</h3>
                        <div className="w-full flex justify-center items-center gap-2">
                            <DatePicker format="DD/MM/YYYY" onChange={(newDate) => { console.log(newDate) }} label="Start date" className='w-full' defaultValue={dayjs('2022-04-17')} />
                            <TimePicker label="Start time (+06)" className='w-full' defaultValue={dayjs('2024-01-17T15:30')} />
                        </div>
                        <FormControlLabel control={<Checkbox onChange={(e) => { setIsEndTime(e.target.checked) }} />} label="Set end date" />
                        {
                            isEndTime && <div className="w-full flex justify-center items-center gap-2 mt-3">
                                <DatePicker format="DD/MM/YYYY" label="End date" className='w-full' defaultValue={dayjs('2022-04-17')} />
                                <TimePicker label="End time (+06)" className='w-full' defaultValue={dayjs('2024-01-17T15:30')} />
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    );
};

export default page;