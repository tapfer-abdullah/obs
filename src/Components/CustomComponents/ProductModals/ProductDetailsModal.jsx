"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import demoImg from "../../../Assects/ux.png";
import "../CustomComponents.css";
import DetailsModalImage from "./DetailsModalImage";

const ProductDetailsModal = ({ details, isActiveModal, setActiveModal }) => {
  // document.body.classList.add("show-modal");
  const [selectedItems, setSelectedItems] = useState(0);
  const imageData = [
    "https://i.ibb.co/g6z3QwZ/image.png",
    "https://i.ibb.co/JrjzHZN/image.png",
    "https://i.ibb.co/cvRQFF3/1260521.jpg",
    "https://i.ibb.co/34KMXfv/image.png",
    "https://i.ibb.co/g6z3QwZ/image.png",
    "https://i.ibb.co/JrjzHZN/image.png",
    "https://i.ibb.co/cvRQFF3/1260521.jpg",
  ];
  return (
    <div className="ProductDetails-modal-image-container">
      <div className="fixed z-[10] top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-50">
        <div className="relative w-2/3 mx-auto mt-[7%] bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="">
            <DetailsModalImage imageData={imageData} />
            <RxCross2
              onClick={() => {
                setActiveModal(!isActiveModal);
              }}
              className="absolute top-2 right-2 text-xl font-bold cursor-pointer"
            />
          </div>
          <div className="details-modal-content space-y-5">
            <div>
              <Link href={"/"} className="uppercase font-medium">
                Odbhootstore
              </Link>
              <h3 className="text-xl font-semibold">Seamless Fitness Yoga Wear Shorts Set</h3>
            </div>
            <div className="flex justify-between items-center">
              <span>In Stock</span>
              <span>Type: GYM</span>
              <span>SKU: CJNS102226001AZ</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center justify-start gap-1">
                <MdOutlineEuroSymbol />
                <span>50.00</span>
              </div>
              <div className="text-2xl font-bold flex items-center justify-start gap-1">
                <span>Colors: </span>
                <select name="colors" id="" className="border border-2 border-gray-900 rounded-md text-lg ">
                  <option value="Red">Red</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                </select>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ullam magnam ducimus tempora consequuntur porro? Provident harum explicabo rerum atque inventore iure ut laboriosam nemo
              velit, possimus esse optio voluptate eveniet modi itaque quos rem quisquam nam, qui quod vitae est iusto sit illo. Exercitationem beatae nemo aperiam eveniet ad!
            </p>
            <div className="size-container relative flex gap-1 my-3">
              <p className="mt-2 text-lg font-semibold">Select Size:</p>
              <div className="relative w-10 mr-3">
                <input type="radio" id="size-s" name="size" value="s" />
                <label for="size-s">S</label>
              </div>
              <div className="relative w-10 mr-3">
                <input type="radio" id="size-m" name="size" value="m" />
                <label for="size-m">M</label>
              </div>
              <div className="relative w-10 mr-5">
                <input type="radio" id="size-l" name="size" value="l" />
                <label for="size-l">L</label>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mt-10">
                <div className="text-xl font-bold">
                  <button
                    onClick={() => {
                      setSelectedItems(selectedItems - 1);
                    }}
                    className="py-2 px-5 bg-slate-300 mx-[1px]"
                  >
                    -
                  </button>
                  <button className="py-2 px-5 bg-slate-300 mx-[1px]">{selectedItems}</button>
                  <button
                    onClick={() => {
                      setSelectedItems(selectedItems + 1);
                    }}
                    className="py-2 px-5 bg-slate-300 mx-[1px]"
                  >
                    +
                  </button>
                </div>
                <div className="flex-grow">
                  <button className="py-2 px-5 bg-black text-white mx-[1px] uppercase w-full">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
