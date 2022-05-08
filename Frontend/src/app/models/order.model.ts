import { CartModel } from "./cart.model";
import { CityModel } from "./city.model";

export class OrderModel {
    public _id: string;
    public shoppingCartId: string;
    public finalPrice: number;
    public cityId: string;
    public street: string;
    public deliveryDate: string;
    public creationDate: string;
    public fourLastDigits: string;
    public shoppingCart: CartModel;
    public city: CityModel;
}