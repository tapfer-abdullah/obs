import ProductCard1 from "@/Components/CustomComponents/ProductCard1";
import SectionTitle from "@/Components/CustomComponents/SectionTitle/SectionTitle";
import React from "react";

const NewArrival = () => {
  return (
    <div className="max-w-7xl mx-auto my-6">
      <SectionTitle title={"NEW ARRIVALS"} subTitle={"Browse the huge variety of our products"}></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
        <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
        <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
        <ProductCard1 price={50} name={"Luminary Luxe"} img1={"https://i.ibb.co/g6z3QwZ/image.png"} img2={"https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg"}></ProductCard1>
      </div>
    </div>
  );
};

export default NewArrival;
