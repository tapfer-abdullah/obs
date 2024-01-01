"use client";
import DBCollectionTypeCard from "@/Components/CustomComponents/DBCollectionTypeCard/DBCollectionTypeCard";
import { axiosHttp } from "@/app/helper/axiosHttp";
import { useEffect, useState } from "react";

const DBTypes = () => {
  const [activeType, setActiveType] = useState("");
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    axiosHttp
      .get(`/types`)
      .then((res) => {
        setTypeData(res.data);
        setActiveType(res.data?.[0]?.title);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  //   useEffect(() => {
  //     axiosHttp
  //       .get(`/products?status=All&category=${activeType}`)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, [filterOption, activeType]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <h1 className="text-xl font-semibold mb-5">All Available types</h1>
        {typeData?.map((d) => (
          <DBCollectionTypeCard key={d?._id} activeType={activeType} setActiveType={setActiveType} data={d} />
        ))}
      </div>

      <div className="">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Users of {activeType} type</h3>
          <select name="filterType" id="filterType" className="py-2 pl-2 pr-5 text-lg font-semibold outline-0 rounded-md">
            <option disabled selected value="Filter Type">
              Filter Type
            </option>
            <option value="Category">Category</option>
            <option value="type">Products</option>
          </select>
        </div>
        <div className="bg-[#def1e7] h-full">f</div>
      </div>
    </div>
  );
};

export default DBTypes;
