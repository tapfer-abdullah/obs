import Collections from "@/Components/Pages/Collections/Collections";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";



const page = () => {
    return (
        <div className="max-w-7xl mx-auto pt-20">
            <div className="text-lg font-semibold flex items-center space-x-1 my-2 p-2 bg-[#e9e9e9]">
                <Link href={"/"}>Home</Link>
                <IoIosArrowForward />
                <Link href={"/Collections"}>Collections</Link>
            </div>
            <div>
                <h3 className="my-10 text-xl font-medium text-center">All Collections</h3>
                <div className="grid grid-cols-1 md:right-2 lg:grid-cols-4 gap-3">
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                    <Collections />
                </div>
            </div>
        </div>
    );
};

export default page;