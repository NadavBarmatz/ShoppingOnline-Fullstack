import { Document, Schema, model } from "mongoose";

export interface ICredentialsModel extends Document {
    username: string;
    password: string;
};

const CredentialsSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [2, "Username must be min 2 chars"],
        maxlength: [15, "Username must be max 15 chars"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password must be min 4 chars"],
    },
}, {
    versionKey: false,
    id: false
});

export const CredentialsModel = model("CredentialsModel", CredentialsSchema, "users");