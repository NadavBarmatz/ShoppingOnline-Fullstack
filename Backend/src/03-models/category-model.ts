import { Document, Schema, model } from "mongoose";

export interface ICategoryModel extends Document {
    name: string;
};

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    }
}, {
    versionKey: false,
    id: false
});

export const CategoryModel = model("CategoryModel", CategorySchema, "categories");