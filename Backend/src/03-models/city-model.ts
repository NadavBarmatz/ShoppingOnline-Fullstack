import { Document, Schema, model } from "mongoose";

export interface ICityModel extends Document {
    name: string;
};

const CitySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    }
}, {
    versionKey: false,
    id: false
});

export const CityModel = model("CityModel", CitySchema, "cities");