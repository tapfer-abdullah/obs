"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import ProductCard1 from "@/Components/CustomComponents/ProductCard1";
import SectionTitle from "@/Components/CustomComponents/SectionTitle/SectionTitle";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

const RelatedProducts = ({ title, subTitle, modalDetails, isActiveModal, setActiveModal }) => {
  return (
    <div className="mt-10">
      {isActiveModal && <ProductDetailsModal isActiveModal={isActiveModal} setActiveModal={setActiveModal} />}

      <div className="max-w-7xl mx-auto my-6">
        <SectionTitle title={title} subTitle={subTitle}></SectionTitle>

        <>
          <Swiper
            navigation={true}
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard1 modalDetails={modalDetails} isActiveModal={isActiveModal} setActiveModal={setActiveModal}></ProductCard1>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default RelatedProducts;
