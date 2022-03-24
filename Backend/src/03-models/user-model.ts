import { Document, Schema, model } from "mongoose";
import { CityModel } from "./city-model";
import { Role } from "./role-model";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    cityId: Schema.Types.ObjectId;
    street: string;
};

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true,"firstName is required"],
        minlength: [2, "firstName must be min 2 chars"],
        maxlength: [10, "firstName must be max 10 chars"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true,"lastName is required"],
        minlength: [2, "lastName must be min 2 chars"],
        maxlength: [15, "lastName must be max 15 chars"],
        trim: true
    },
    username: {
        type: String,
        required: [true,"username is required"],
        minlength: [2, "username must be min 2 chars"],
        maxlength: [15, "username must be max 15 chars"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        match: [/^(.+)@(.+)$/, "invalid email structure"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: [4, "password must be min 2 chars"],
        maxlength: [10, "password must be max 15 chars"],
    },
    role: {
        type: String
    },
    cityId: {
        type: Schema.Types.ObjectId,
        required: [true, "city is required"]
    },
    street: {
        type: String,
        required: [true, "street is required"]
    },
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true}
});

UserSchema.virtual("city", {
    ref: CityModel,
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});

export const UserModel = model("UserModel", UserSchema, "users");