import { CollectionsSchema } from "@/app/models/collections";
import { NextResponse } from "next/server";
const { connectDB } = require("@/app/helper/db");


connectDB();

export const GET = async () => {
    try {
        const collections = await CollectionsSchema.find();
        return NextResponse.json(collections)
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch type!", status: false });
    }
}

export const POST = async (request) => {
    const data = await request.json();

    try {
        const newCollection = new CollectionsSchema(data);
        const result = await newCollection.save();
        return NextResponse.json({ message: "Collection created successfully", statue: true, data: result })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create collection!", status: false });
    }
}

