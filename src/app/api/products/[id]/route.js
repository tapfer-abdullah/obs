import { Products } from "@/app/models/products";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");

connectDB();

export const GET = async (request, { params }) => {
    const id = params?.id;

    if (!id) {
        return NextResponse.json({ message: "Id not found!", status: false });
    }

    try {
        const product = await Products.findById(id);
        return NextResponse.json(product);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}


// Function to remove "_id" property recursively
const removeIds = (obj) => {
    if (obj instanceof Array) {
        obj.forEach((item) => removeIds(item));
    } else if (obj instanceof Object) {
        for (const key in obj) {
            if (key === '_id') {
                delete obj[key];
            } else {
                removeIds(obj[key]);
            }
        }
    }
};


export const PUT = async (request, { params }) => {
    const id = params?.url;
    const newData = await request.json();
    removeIds(newData);

    try {
        const result = await Products.findByIdAndUpdate(id, newData, { new: true });
        console.log("result: ", result);
        return NextResponse.json({ message: "Updated Successfully!", status: true, data: result });
    } catch (error) {
        console.log("update product error: ", error);
        return NextResponse.json({ message: "Failed to update product!", status: false, error: error.message });
    }
};
