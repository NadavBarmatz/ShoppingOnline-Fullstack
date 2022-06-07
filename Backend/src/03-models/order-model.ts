import { Document, Schema, model } from "mongoose";
import { CityModel } from "./city-model";
import { ShoppingCartModel } from "./shopping-cart-model";

export interface IOrderModel extends Document {
    shoppingCartId: Schema.Types.ObjectId;
    finalPrice: number;
    cityId: Schema.Types.ObjectId;
    street: string;
    deliveryDate: string;
    creationDate: string;
    fourLastDigits: string;
};

const OrderSchema = new Schema({
    shoppingCartId: {
        type: Schema.Types.ObjectId,
        required: [true, "shoppingCartId is required"]
    },
    finalPrice: {
        type: Number,
        required: [true, "finalPrice is required"],
        min: [0.01, "finalPrice must be min 0.01"],
    },
    cityId: {
        type: Schema.Types.ObjectId,
        required: [true, "cityId is required"]
    },
    street: {
        type: String,
        required: [true, "street is required"],
        minlength: [2, "street must be min 2 chars"],
        maxlength: [20, "street must be min 20 chars"],
        trim: true
    },
    deliveryDate: {
        type: String,
        required: [true, "deliveryDate is required"]
    },
    creationDate: {
        type: String,
        required: [true, "creationDate is required"]
    },
    fourLastDigits: {
        type: String,
        required: [true, "fourLastDigits is required"],
        minlength: [4, "fourLastDigits must be min 4"],
        maxlength: [4, "fourLastDigits must be max 4"]
    }
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true}
});

OrderSchema.virtual("shoppingCart",{
    ref: ShoppingCartModel,
    localField: "shoppingCartId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("city",{
    ref: CityModel,
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});

export const OrderModel = model("OrderModel", OrderSchema, "orders");