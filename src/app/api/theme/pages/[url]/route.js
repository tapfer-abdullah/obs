import { connectDB } from "@/app/helper/db";
import { PagesSchema } from "@/app/models/pages";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (request, { params }) => {
    const url = params?.url;

    try {
        const page = await PagesSchema.findOne({ url: { $regex: new RegExp(url, "i") } });
        return NextResponse.json(page);

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch data!", status: false });
    }
}