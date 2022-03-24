import ClientError from '../03-Models/client-error';
import mongoose from 'mongoose';
import { IShoppingCartModel, ShoppingCartModel } from '../03-models/shopping-cart-model';

async function getAllCarts(): Promise<IShoppingCartModel[]> {
    return ShoppingCartModel.find().populate("user");
}

async function getOneCart(_id: string): Promise<IShoppingCartModel> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    const cart = await ShoppingCartModel.findById(_id).populate("user").exec();

    // Validate cart existence:
    if(!cart) throw new ClientError(404, "Shopping Cart not found");

    return cart;
}

async function addCart(cart: IShoppingCartModel): Promise<IShoppingCartModel> {
    // Validate cart:
    const errors = cart.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedCart = cart.save();
    return addedCart;
}

async function updateCart(cart: IShoppingCartModel): Promise<IShoppingCartModel> {
    // Validate cart:
    const errors = cart.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // update:
    const updatedCart = await ShoppingCartModel.findByIdAndUpdate(cart._id, cart, {returnOriginal: false}).exec();

    // Validate if cart exist in DB:
    if(!updatedCart) throw new ClientError(404, "Shopping Cart is not found");

    return updatedCart;
}

async function deleteCart(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Delete:
    const deletedCart = await ShoppingCartModel.findByIdAndDelete(_id);

    // Validate cart found:
    if(!deletedCart) throw new ClientError(404, "Shopping Cart not found");
}

export default {
    getAllCarts,
    getOneCart,
    addCart,
    updateCart,
    deleteCart
}