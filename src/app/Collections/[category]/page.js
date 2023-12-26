"use client"
import ProductCard1 from '@/Components/CustomComponents/ProductCard1';
import ProductDetailsModal from '@/Components/CustomComponents/ProductModals/ProductDetailsModal';
import Loader from '@/Hooks/Loader/Loader';
import { axiosHttp } from '@/app/helper/axiosHttp';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFilterLeft } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";


const page = () => {

    const pathname = usePathname()
    const category = pathname.replace('/Collections/', '');
    // const [isActiveModal, setActiveModal] = useState(false);
    // const [modalDetails, setModalDetails] = useState({ price: 50, name: "Luminary Luxe", img1: "https://i.ibb.co/g6z3QwZ/image.png", img2: "https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg" });

    const [allProductsData, setAllProductsData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosHttp.get("/products").then((res) => {
            setAllProductsData(res.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="pt-[68px] mt-20">
            <Loader />
        </div>
    }

    return (
        <div className='pt-[68px]'>
            <div className='h-[25vh] w-full overflow-hidden flex items-center justify-center relative' >
                <img src="https://i.ibb.co/ZWgMyx4/arab-Desert.jpg" alt="" className='h-auto w-full' />
                <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-black opacity-40'>
                </div>
                <h3 className='absolute font-bold text-2xl text-white'>{category}</h3>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 my-10">

                <div className='bg-[#f9f9f9] mt-4 max-h-[70vh]'>
                    <div className="text-lg font-semibold flex items-center space-x-1 -mt-2 p-2 bg-[#e9e9e9]">
                        <Link href={"/"}>Home</Link>
                        <IoIosArrowForward />
                        <Link href={"/Collections"}>Collections</Link>
                        <IoIosArrowForward />
                        <Link href={`/Collections/${category}`}>{category}</Link>
                    </div>

                    <div className='space-y-2 px-5'>
                        <h3 className='text-xl font-semibold text-center mt-3 mb-1'>Filter items</h3>
                        <div className='border-b-2'></div>
                        <div className='text-lg space-x-2 '>
                            <input type="checkbox" name="in-stock" id="in-stock" />
                            <label htmlFor="in-stock" className='cursor-pointer'>In Stock</label>
                        </div>
                        <div className='text-lg space-x-2'>
                            <input type="checkbox" name="out-stock" id="out-stock" />
                            <label htmlFor="out-stock" className='cursor-pointer'>Out of Stock</label>
                        </div>
                        <div className='text-lg space-x-2'>
                            <input type="checkbox" name="height-selling" id="height-selling" />
                            <label htmlFor="height-selling" className='cursor-pointer'>Height Selling</label>
                        </div>
                        <div className='text-lg space-x-2'>
                            <input type="radio" name="price-range" id="heigh-low" />
                            <label htmlFor="heigh-low" className='cursor-pointer'>Price heigh to low</label>
                        </div>
                        <div className='text-lg space-x-2'>
                            <input type="radio" name="price-range" id="low-heigh" />
                            <label htmlFor="low-heigh" className='cursor-pointer'>Price low to heigh</label>
                        </div>
                        <div className='text-lg space-x-2'>
                            <input type="radio" name="price-range" id="default-price" />
                            <label htmlFor="default-price" className='cursor-pointer'>Clear price</label>
                        </div>

                    </div>
                </div>

                <div className='col-span-3 grid grid-cols-3 gap-4'>
                    {allProductsData?.map((singleProduct) => (
                        <ProductCard1 key={singleProduct?._id} singleProduct={singleProduct}></ProductCard1>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default page;

