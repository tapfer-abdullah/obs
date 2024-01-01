import { Products } from "@/app/models/products";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");

connectDB();

export const GET = async ({ params }) => {
    const id = params?.id;

    try {
        const product = await Products.findById(id);
        return NextResponse.json(product);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}
