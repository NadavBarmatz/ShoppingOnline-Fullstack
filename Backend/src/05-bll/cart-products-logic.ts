import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { CartProductModel, ICartProductModel } from '../03-models/cart-product-model';
import productLogic from "./products-logic";

async function getAllCartProducts(): Promise<ICartProductModel[]> {
    return CartProductModel.find().populate("product").populate("shoppingCart");
}

// async function getOneCartProduct(_id: string): Promise<ICartProductModel> {
//     // Validate _id:
//     if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

//     const cartProd = await CartProductModel.findById(_id).populate("product").populate("shoppingCart").exec();

//     // Validate cart existence:
//     if(!cartProd) throw new ClientError(404, "Cart Product not found");

//     return cartProd;
// }

async function addCartProduct(cartProd: ICartProductModel, prodId: string): Promise<ICartProductModel> {
    // Getting the price of the prod:
    const ogProductPrice = (await productLogic.getOneProduct(prodId)).price;

    // Setting total price for cart prod
    cartProd.totalPrice = cartProd.quantity * ogProductPrice;

    // Validate cart:
    const errors = cartProd.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedCartProd = cartProd.save();
    return addedCartProd;
}

async function updateCartProduct(cartProd: ICartProductModel): Promise<ICartProductModel> {
    // Validate cart:
    const errors = cartProd.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // update:
    const updatedCartProd = await CartProductModel.findByIdAndUpdate(cartProd._id, cartProd, {returnOriginal: false}).exec();

    // Validate if cart exist in DB:
    if(!updatedCartProd) throw new ClientError(404, "Cart Product is not found");

    return updatedCartProd;
}

async function deleteCartProduct(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Delete:
    const deletedCartProd = await CartProductModel.findByIdAndDelete(_id);

    // Validate cart found:
    if(!deletedCartProd) throw new ClientError(404, "Cart Product not found");
}

export default {
    getAllCartProducts,
    // getOneCartProduct,
    addCartProduct,
    updateCartProduct,
    deleteCartProduct
}