import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../CustomComponents.css";

// Import Swiper styles
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Link from "next/link";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const DetailsModalImage = ({ singleProduct, rightSlider, leftSlider, imgIndex, setImgIndex }) => {
  console.log(singleProduct);
  const imageData = singleProduct?.colors;

  return (
    <>
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-2 top-[50%]">
            <IoIosArrowDropleft
              className={`${imageData?.length < 2 ? "hidden" : ""} text-white font-semibold text-4xl cursor-pointer hover:text-black hover:bg-white rounded-full transition-all duration-300`}
              onClick={leftSlider}
            />
          </div>
          <div>
            <img src={imageData?.[imgIndex]?.imageUrl} alt="img" className="!max-h-[50vh] !w-full" />
          </div>
          <div className="absolute right-2 top-[50%]">
            <IoIosArrowDropright
              className={`${imageData?.length < 2 ? "hidden" : ""} text-white font-semibold text-4xl cursor-pointer hover:text-black hover:bg-white rounded-full transition-all duration-300`}
              onClick={rightSlider}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {imageData?.map((i, index) => (
            <img
              onClick={() => setImgIndex(index)}
              src={i?.imageUrl}
              alt="slide img"
              className={`w-20 h-20 cursor-pointer border-[3px] p-[1px] ${index == imgIndex ? " border-black" : "border-white"}`}
            />
          ))}
        </div>
      </div>

      {/* <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >

        <img src={singleProduct.colors.find((color) => color.name === selectedColor)?.imageUrl} alt="img" className="!max-h-[50vh] my-2" />
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        {imageData?.map((img, indx) => (
          <div key={indx}>
            <SwiperSlide>
              <img src={img} className="!h-[70px] !w-full" />
            </SwiperSlide>
          </div>
        ))}
      </Swiper> */}
      <Link href={`/Collections/${singleProduct?.category?.[0]?.label}/${singleProduct?._id}`} className="text-lg font-medium mt-8 flex justify-center items-center gap-2 hover:underline">
        <p>View More Details</p>
        <FaArrowUpRightFromSquare />
      </Link>
    </>
  );
};

export default DetailsModalImage;
