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

    const [imgIndex, setImgIndex] = useState(0);

    console.log(resultArray[2])

    useEffect(() => {
        setLoading(true);
        axiosHttp.get(`/products/${resultArray[2]}`).then(res => {
            setSingleProduct(res.data);
            setLoading(false);
        })
    }, [])

    // left btn 
    const leftSlider = () => {

        if (imgIndex - 1 < 0) {
            setImgIndex(singleProduct?.colors?.length - 1);
        }
        else {
            setImgIndex(imgIndex - 1);
        }
    }

    // right btn 
    const rightSlider = () => {

        if (imgIndex + 1 == singleProduct?.colors?.length) {
            setImgIndex(0);
        }
        else {
            setImgIndex(imgIndex + 1);
        }
    }

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
                <h4>{singleProduct?.title}</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                <div className="w-full">
                    <IDWiseProduct imageData={singleProduct?.colors} setImgIndex={setImgIndex} rightSlider={rightSlider} leftSlider={leftSlider} imgIndex={imgIndex} />
                </div>
                <div className="">
                    <IDWiseDetails singleProduct={singleProduct} setImgIndex={setImgIndex} imgIndex={imgIndex} />
                </div>
            </div>

            <IDWIseDescriptions description={singleProduct?.description} />
            {/* <RelatedProducts title={"Related Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} />
            <RelatedProducts title={"Recommended Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} /> */}
        </div>
    );
};

export default page;