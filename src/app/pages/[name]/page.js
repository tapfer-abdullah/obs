"use client"
import ReactHtmlParser from 'react-html-parser';

import { axiosHttp } from "@/app/helper/axiosHttp";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const page = () => {
    const pathname = usePathname()
    const pageName = pathname.replace('/pages/', '');
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        axiosHttp.get(`/theme/pages/${pageName}`).then(res => {
            setPageData(res.data);
        })
    })

    return (
        <div className='pt-[68px] max-w-7xl mx-auto'>
            <h3 className="text-xl font-semibold text-center my-5">
                {pageData?.title}
            </h3>

            <div>
                {ReactHtmlParser(pageData?.content)}
            </div>
        </div>
    );
};

export default page;