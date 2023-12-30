import mongoose, { Schema } from "mongoose";


const colorsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    label: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
});

const sizeSchema = new mongoose.Schema({
    value: String,
    label: String
})
const typeSchema = new mongoose.Schema({
    value: String,
    label: String
})
const categorySchema = new mongoose.Schema({
    value: String,
    label: String
})

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
    comparePrice: {
        type: Number,
        min: 0,
    },
    category: {
        type: [categorySchema],
        required: true,
    },
    stockQuantity: {
        type: Number,
        min: 0,
    },
    sellQuantity: {
        type: Number,
        min: 0,
    },
    imageUrl: {
        type: [String],
        required: true,
    },
    colors: {
        type: [colorsSchema],
        default: [],
    },
    size: {
        type: [sizeSchema],
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
        type: [typeSchema],
        require: true
    }
})


export const Products = mongoose.models.allproducts || mongoose.model("allproducts", productsSchema);
