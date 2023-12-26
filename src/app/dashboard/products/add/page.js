"use client"
import { TextField } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

// import JoditEditor from 'jodit-react';
import React, { useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import "./AddProduct.css";

const category = [
    { value: "Bracelets", label: "Bracelets" },
    { value: "Earrings", label: "Earrings" },
    { value: "Dress", label: "Dress" },
    { value: "GYM", label: "GYM" },
    { value: "Necklace", label: "Necklace" },
    { value: "Pant", label: "Pant" },
    { value: "Watches", label: "Watches" }

];
const types = [
    { value: "Clothing", label: "Clothing" },
    { value: "Jewelry", label: "Jewelry" },


];

const sizes = [
    { value: "One Size", label: "One Size" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "N", label: "N" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" }
]

const colors = [
    { value: "red", label: "Red" },
    { value: "Rose-Gold", label: "Rose-Gold" },
    { value: "Silver", label: "Silver" },
    { value: "Pink", label: "Pink" },
    { value: "Black", label: "Black" }
]

const page = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    return (
        <div className='my-5'>
            <div className="space-y-3 w-4/5 mx-auto bg-white p-5 rounded-xl shadow-xl">
                <img src="https://i.ibb.co/jW9MTfv/image.png" alt="" className='w-20 mx-auto' />
                <h4 className="text-xl font-semibold text-center">Add a product</h4>

                <TextField required type="text" name="name" id="name" className="rounded-md w-full border-2" label="Name" />
                <div className="flex items-center gap-2">
                    <TextField required type="text" name="imgURL1" id="imgURL1" className="rounded-md w-full border-2 " label="First IMG URL" />
                    <TextField required type="text" name="imgURL2" id="imgURL2" className="rounded-md w-full border-2 " label="Second IMG URL" />
                </div>
                <div className="flex items-center gap-2">
                    <TextField required type="number" name="price" id="price" className="rounded-md w-full border-2 " label="Price" />
                    <TextField required type="text" name="price" id="sku" className="rounded-md w-full border-2 " label="SKU" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                        <span>
                            Type * <small>(Jewelry, Clothing etc)</small>
                        </span>
                        <CreatableSelect required options={types} isMulti placeholder="Select type" className='z-20' />
                    </div>
                    <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                        <span>
                            Category * <small>(choose category)</small>
                        </span>
                        <Select
                            isMulti
                            name="category"
                            options={category}
                            className="basic-multi-select z-30"
                            placeholder="Select category"
                        />
                    </div>
                    <div className="w-full space-y-1 md:max-w-full lg:max-w-md">
                        <span>
                            Sizes * <small>(choose sizes)</small>
                        </span>
                        <CreatableSelect required options={sizes} isMulti placeholder="Select sizes" className='z-20' />
                    </div>
                </div>

                <div>
                    <p>
                        Colors & Color wise images * <small>(choose sizes)</small>
                    </p>
                    <div className='flex gap-2 w-full items-end'>
                        <CreatableSelect required options={colors} isMulti placeholder="Select colors" className='z-20 w-full' />
                        <TextField required type="text" name="imgURLx" id="imgURLx" className="rounded-md w-full border-2 " label="IMG URL" />
                    </div>
                </div>

                <div>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    />
                </div>




                <div>
                    {/* {ReactHtmlParser(content)} */}
                </div>


            </div>
        </div>
    );
};

export default page;