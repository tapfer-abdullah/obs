"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import IDWIseDescriptions from './IDWIseDescriptions';
import IDWiseDetails from './IDWiseDetails';
import IDWiseProduct from './IDWiseProduct';
import RelatedProducts from './RelatedProducts';


const page = () => {
    const pathname = usePathname()
    const resultArray = pathname.split("/").filter(Boolean);

    const [isActiveModal, setActiveModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({ price: 50, name: "Luminary Luxe", img1: "https://i.ibb.co/g6z3QwZ/image.png", img2: "https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg" });


    const imageData = [
        "https://i.ibb.co/g6z3QwZ/image.png",
        "https://i.ibb.co/JrjzHZN/image.png",
        "https://i.ibb.co/cvRQFF3/1260521.jpg",
        "https://i.ibb.co/34KMXfv/image.png",
        "https://i.ibb.co/g6z3QwZ/image.png",
        "https://i.ibb.co/JrjzHZN/image.png",
        "https://i.ibb.co/cvRQFF3/1260521.jpg",
    ];

    console.log(resultArray);
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
                    <IDWiseProduct imageData={imageData} />
                </div>
                <div className="">
                    <IDWiseDetails />
                </div>
            </div>

            <IDWIseDescriptions />
            <RelatedProducts title={"Related Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} />
            <RelatedProducts title={"Recommended Products"} isActiveModal={isActiveModal} setActiveModal={setActiveModal} modalDetails={modalDetails} setModalDetails={setModalDetails} />
        </div>
    );
};

export default page;