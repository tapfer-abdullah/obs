
import { TypesSchema } from "@/app/models/types";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/helper/db");


connectDB();

export const GET = async () => {
    try {
        const allType = await TypesSchema.find();
        return NextResponse.json(allType);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch type!", status: false });
    }
}


export const POST = async (request) => {
    const data = await request.json();

    try {
        const newType = new TypesSchema(data);
        const result = await newType.save();

        return NextResponse.json({ message: "Type created successfully", statue: true, data: result })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create type!", status: false });
    }
}