import { Products } from "@/app/models/products";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");


connectDB();

export const GET = async (request, { params }) => {

    try {
        const allProducts = await Products.find();
        // console.log("dfa", allProducts)
        return NextResponse.json(allProducts);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}


export const POST = async (request) => {
    const productData = await request.json();

    try {
        const newProduct = new Products(productData);
        const result = await newProduct.save();
        return NextResponse.json({ message: "Product added successfully", statue: true, data: result })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to add product!", status: false });
    }
}
