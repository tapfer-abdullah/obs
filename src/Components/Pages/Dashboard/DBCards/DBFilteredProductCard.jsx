"use client";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const DBFilteredProductCard = ({ productsData }) => {
  return (
    <div className="bg-[#def1e7] p-3 rounded-lg">
      {productsData.length == 0 && (
        <div className="flex flex-col justify-center items-center">
          <img src="https://i.ibb.co/Nmm2QxV/empty-cart.png" alt="no-product-img" className="w-72 h-auto" />
          <p className="text-md font-semibold text-red-500">The collection is empty!</p>
        </div>
      )}
      {productsData?.map((p) => (
        <div key={p?._id} className="flex gap-2 items-center border-dashed border-2 border-gray-400 my-2 p-2 rounded-lg drop-shadow-2xl">
          <img src={p?.imageUrl?.[0]} alt="img" className="w-20 h-20 rounded-s-lg" />
          <div className="w-full flex justify-between ">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{p?.title.length > 20 ? <span>{p?.title.slice(0, 20)}..</span> : <span>{p?.title.slice(0, 20)}</span>}</h3>
              <p className="">SKU: {p?.colors?.[0]?.allSKU?.[0]?.sku}</p>
            </div>
            <div className="space-y-1">
              <h3 className="flex gap-1 items-center text-xl font-semibold">
                <span>Price: </span>
                <MdOutlineEuroSymbol />
                <span>{p?.price}</span>
              </h3>
              <p className="">Type: {p?.type?.[0]?.value}</p>
            </div>
          </div>
          <TbListDetails title="View Details" className="text-4xl ml-2 p-1 font-bold bg-white rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default DBFilteredProductCard;
