import { Products } from "@/app/models/products";
import { NextResponse } from "next/server";
import { parse } from 'url';

const { connectDB } = require("@/app/helper/db");


connectDB();

export const GET = async (request) => {
    const url = request.url;
    const { query } = parse(url, true);

    const searchParams = new URLSearchParams(query);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    try {
        if (status == null && category == null) {
            const allProducts = await Products.find();
            return NextResponse.json(allProducts);
        }
        else if (status == "All") {
            const allProducts = await Products.find({ 'category.label': category });
            return NextResponse.json(allProducts);
        }
        else if (status && category) {
            const allProducts = await Products.find({
                $and: [
                    {
                        'category.label': category
                    },
                    {
                        'status.label': status
                    }
                ]
            });
            return NextResponse.json(allProducts);

        }

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
