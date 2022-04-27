import { ICartProductModel } from './../03-models/cart-product-model';

function checkIfProductIdAlreadyInCart(cartProducts: ICartProductModel[], cartProduct: ICartProductModel): boolean{
    for(let product of cartProducts) {
        if(product.productId.toString() === cartProduct.productId.toString()) return true;
    }
    return false;
}

function increaseCartProductQuantity(oldCartProduct: ICartProductModel, newCartProduct: ICartProductModel) {
    oldCartProduct.quantity = oldCartProduct.quantity + newCartProduct.quantity;
    updateCartProductPrice(oldCartProduct, newCartProduct);
}

function updateCartProductPrice(oldCartProduct: ICartProductModel, newCartProduct: ICartProductModel) {
    oldCartProduct.totalPrice = oldCartProduct.totalPrice + newCartProduct.totalPrice;
}

export default {
    checkIfProductIdAlreadyInCart,
    increaseCartProductQuantity,
}
