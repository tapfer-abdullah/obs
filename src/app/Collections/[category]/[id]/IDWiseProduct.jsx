import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import "../CustomComponents.css";

// Import Swiper styles
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import Image from "next/image";
import Link from "next/link";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const IDWiseProduct = ({ imageData }) => {
  console.log(imageData);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="">
      <Swiper
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
        {imageData.map((img, indx) => (
          <div key={indx}>
            <SwiperSlide className="my-2">
              <img src={img} className="!h-[300px] !w-full" />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        {imageData?.map((img, indx) => (
          <div key={indx}>
            <SwiperSlide>
              <img src={img} className="!h-[70px] !w-full" />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default IDWiseProduct;
