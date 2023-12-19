import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <div>
      <Link href={"/Collections/bracelets"} className="relative border-2 flex justify-center overflow-hidden">
        <img src="https://i.ibb.co/tLQNdCz/Eiffel-Tower-Day-1200x834.jpg" alt="" className="w-full h-full hover:scale-x-110 transition-all duration-300" />
        <Link href={"/Collections/bracelets"} className="p-3 py-1 bg-white absolute bottom-3 m-0">
          Bracelets
        </Link>
      </Link>
    </div>
  );
};

export default Collections;
