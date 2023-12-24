import { Products } from "@/app/models/products";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");


await connectDB();

export const GET = async (request, { params }) => {

    try {
        const allProducts = await Products.find();
        console.log("dfa", allProducts)
        return NextResponse.json(allProducts);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}


// console.log("Before connectDB");
// await connectDB();
// console.log("After connectDB");
// export const GET = async (request, { params }) => {
//     try {
//         console.log("Before fetching products");
//         const allProducts = await Products.find();
//         console.log("After fetching products");
//         console.log("Products:", allProducts);
//         return NextResponse.json(allProducts);
//     } catch (error) {
//         console.log("Error fetching products:", error);
//         return NextResponse.json({ message: "Failed to fetch data!", status: false });
//     }

// }