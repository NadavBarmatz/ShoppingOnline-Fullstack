import { Document, Schema, model } from "mongoose";
import { ProductModel } from "./product-model";
import { ShoppingCartModel } from "./shopping-cart-model";

export interface ICartProductModel extends Document {
    productId: Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    shoppingCartId: Schema.Types.ObjectId;
};

const CartProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: [true, "productId is required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
        min: [1, "quantity must be min 1"],
    },
    totalPrice: {
        type: Number,
        required: [true, "totalPrice is required"]
    },
    shoppingCartId: {
        type: Schema.Types.ObjectId,
        required: [true, "shoppingCartId is required"]
    }
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true}
});

CartProductSchema.virtual("product",{
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

CartProductSchema.virtual("shoppingCart",{
    ref: ShoppingCartModel,
    localField: "shoppingCartId",
    foreignField: "_id",
    justOne: true
});

export const CartProductModel = model("CartProductModel", CartProductSchema, "cartProducts");