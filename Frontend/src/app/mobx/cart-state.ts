import { Injectable } from "@angular/core";
import { action, makeObservable, observable } from "mobx";
import { CartModel } from "../models/cart.model";




@Injectable({providedIn: "root"})
export class CartState {
    
    @observable
    cart: CartModel = null;

    public constructor() {
        makeObservable(this);
    }

    @action
    public updateCart(cart: CartModel) {
        this.cart = cart;
    }

    @action
    public deleteCart() {
        this.cart = null;
    }
}