import { UploadedFile } from "express-fileupload";
import { Document, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

export interface IProductModel extends Document {
    productName: string;
    categoryId: Schema.Types.ObjectId;
    price: number;
    imageName: string;
    image: UploadedFile;
};

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, "productName is required"],
        minlength: [2, "productName must be min 2 chars"],
        maxlength: [20, "productName must be max 20 chars"],
        trim: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "categoryId is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0.01, "price can't be less then 0.01"],
    },
    imageName: {
        type: String
    },
    image: {
        type: Object,
        required: [true, "Image is required"]
    }
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true},
    // validateBeforeSave: false
});

ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

export const ProductModel = model("ProductModel", ProductSchema, "products");