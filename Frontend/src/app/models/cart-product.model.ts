import { CartModel } from './cart.model';
import { ProductModel } from './product.model';


export class CartProductModel {
    public _id: string;
    public productId: string;
    public quantity: number;
    public shoppingCartId: string;
    public totalPrice: number;
    public product: ProductModel;
    public shoppingCart: CartModel;
}