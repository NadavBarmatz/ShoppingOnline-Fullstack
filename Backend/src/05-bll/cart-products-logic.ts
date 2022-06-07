import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { CartProductModel, ICartProductModel } from '../03-models/cart-product-model';
import logicHelpers from "./cartProductsHelper";
import productLogic from "./products-logic";

async function getAllCartProducts(cartId: string): Promise<ICartProductModel[]> {
    return CartProductModel.find({"shoppingCartId": cartId}).populate("product").populate("shoppingCart");
}

async function addCartProduct(cartProduct: ICartProductModel): Promise<ICartProductModel> {
    // Getting the price of the prod:
    const productPrice = (await productLogic.getOneProduct(cartProduct.productId.toString())).price;
    // Setting total price for cart prod
    cartProduct.totalPrice = cartProduct.quantity * productPrice;
    // Validate:
    const errors = cartProduct.validateSync();
    if(errors) throw new ClientError(400, errors.message);
    // Get all cart products:
    const cartProducts = await getAllCartProducts(cartProduct.shoppingCartId.toString());
    // Check if product already in cart:
    const isInCart = logicHelpers.checkIfProductIdAlreadyInCart(cartProducts, cartProduct);
    // If in cart, get the existing product:
    if(isInCart) {
        const existingProduct = cartProducts.find(product => product.productId.toString() === cartProduct.productId.toString());
        // If so, increase quantity:
        logicHelpers.increaseCartProductQuantity(existingProduct, cartProduct);
        // update Cart Product:
        const updatedProduct = await updateCartProduct(existingProduct);
        return updatedProduct
    }
    // If not, add to db ad new cart product:
    const addedCartProd = cartProduct.save();
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

async function deleteCartProductsByCartId(cartId: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(cartId)) throw new ClientError(404, `cartId ${cartId} is not valid`);

    // getting all cart Products:
    const cartProducts = await getAllCartProducts(cartId);

    for(let cartProduct of cartProducts) {
        cartProduct.delete();
    }
}

export default {
    getAllCartProducts,
    addCartProduct,
    updateCartProduct,
    deleteCartProduct,
    deleteCartProductsByCartId
}