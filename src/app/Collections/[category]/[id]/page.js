"use client"
import Loader from '@/Hooks/Loader/Loader';
import { axiosHttp } from '@/app/helper/axiosHttp';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import IDWIseDescriptions from './IDWIseDescriptions';
import IDWiseDetails from './IDWiseDetails';
import IDWiseProduct from './IDWiseProduct';
import RelatedProducts from './RelatedProducts';


const page = () => {
    const pathname = usePathname()
    const resultArray = pathname.split("/").filter(Boolean);

    const [singleProduct, setSingleProduct] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosHttp.get(`/products/${resultArray[2]}`).then(res => {
            setSingleProduct(res.data);
            setLoading(false);
        })
    }, [])

    if (isLoading) {
        return <div className='pt-[68px] mt-20'>
            <Loader />
        </div>
    }

    return (
        <div className='pt-20 max-w-7xl mx-auto'>
            <div className="text-lg font-semibold flex items-center space-x-1 my-2 p-2 bg-[#e9e9e9]">
                <Link href={"/"}>Home</Link>
                <IoIosArrowForward />
                <Link href={"/Collections"}>Collections</Link>
                <IoIosArrowForward />
                <Link href={`/Collections/${resultArray[1]}`}>{resultArray[1]}</Link>
                <IoIosArrowForward />
                <h4>Name of the necklace</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                <div className="w-full">
                    <IDWiseProduct imageData={singleProduct?.colors} />
                </div>
                <div className="">
                    <IDWiseDetails singleProduct={singleProduct} />
                </div>
            </div>

            <IDWIseDescriptions description={singleProduct?.description} />
            {/* <RelatedProducts title={"Related Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} />
            <RelatedProducts title={"Recommended Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} /> */}
        </div>
    );
};

export default page;