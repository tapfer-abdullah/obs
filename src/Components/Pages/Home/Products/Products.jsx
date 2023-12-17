"use client";
import React, { useRef, useState } from "react";
import "./Products.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import ProductCard1 from "@/Components/CustomComponents/ProductCard1";
import SectionTitle from "@/Components/CustomComponents/SectionTitle/SectionTitle";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Products = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <SectionTitle title={"Shop By Category"} subTitle={"Browse the huge variety of our products"}></SectionTitle>

      <Tabs>
        <TabList className={"font-semibold text-lg"}>
          <Tab>Clothings</Tab>
          <Tab>Jewelry</Tab>
        </TabList>

        <TabPanel>
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
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
              </SwiperSlide>
            </Swiper>
          </>
        </TabPanel>
        <TabPanel>
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
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard1
                  price={50}
                  name={"Luminary Luxe"}
                  img1={"https://i.ibb.co/nnwLnM3/london-england-credit-tomas-marek-istock.jpg"}
                  img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}
                ></ProductCard1>
              </SwiperSlide>
            </Swiper>
          </>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Products;