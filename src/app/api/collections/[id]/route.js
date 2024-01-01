
import { CollectionsSchema } from "@/app/models/collections";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");

connectDB();

export const GET = async (request, { params }) => {
    const id = params?.id;

    try {
        const product = await CollectionsSchema.findById(id);
        return NextResponse.json(product);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}

export const PUT = async (request, { params }) => {
    const id = params?.id;
    const newData = await request.json();

    try {
        const result = await CollectionsSchema.findByIdAndUpdate(id, newData, { new: true });
        return NextResponse.json({ message: "Updated successfully!", status: true, data: result });

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed update!", status: false });
    }
}

export const DELETE = async (request, { params }) => {
    const id = params?.id;

    try {
        const result = await CollectionsSchema.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully!", status: true, data: result });

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed delete!", status: false });
    }
}
