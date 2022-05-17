import { Document, Schema, model } from "mongoose";
import { UserModel } from "./user-model";

export interface IShoppingCartModel extends Document {
    userId: Schema.Types.ObjectId;
    creationDate: string;
    isOpen: boolean;
};

const ShoppingCartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId is required"]
    },
    creationDate: {
        type: String,
        required: [true, "creationDate is required"],
    },
    isOpen: {
        type: Boolean,
        required: [true, "isOpen is required"]
    }
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true}
});

ShoppingCartSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});



// Will be used for carts in process:
export const ShoppingCartModel = model("ShoppingCartModel", ShoppingCartSchema, "shoppingCarts");