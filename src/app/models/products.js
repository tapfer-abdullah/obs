import mongoose, { Schema } from "mongoose";


const colorsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
});

const productsSchema = new Schema({
    title: {
        type: String,
        required: [true, "Product title is required!"]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    colors: {
        type: [colorsSchema],
        default: [],
    },
    size: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    sku: {
        type: String,
        required: true
    },
    type: {
        type: String,
        require: true
    }
})


export const Products = mongoose.models.allProduct || mongoose.model("allProduct", productsSchema);
