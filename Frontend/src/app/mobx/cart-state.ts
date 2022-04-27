import { Injectable } from '@angular/core';
import { action, computed, configure, makeAutoObservable, observable, toJS } from 'mobx';
import { CartProductModel } from '../models/cart-product.model';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';

configure({useProxies: "never"})

@Injectable({
  providedIn: 'root'
})
export class CartState {

  @observable
  public cart: CartModel;
  @observable
  public cartProducts: CartProductModel[] = [];

  constructor() { 
    makeAutoObservable(this);
  }

  @action
  public saveCart(cart: CartModel) {
    this.cart = cart;
  }

  @action
  public saveCartProducts(cartProducts: CartProductModel[]) {
    this.cartProducts = cartProducts;
  }

  @action
  public addProductToCart(cartProduct: CartProductModel) {
    this.cartProducts = [...this.cartProducts, cartProduct];
  }

  @action
  public deleteCart() {
    this.cart = null;
  }

  @action
  public deleteCartProducts() {
    this.cartProducts = [];
  }

  @action
  public deleteCartProduct(cartProductId: string) {
    const indexToDelete = this.cartProducts.findIndex(cartProduct => cartProduct._id === cartProductId);
    if(indexToDelete !== -1) {
      this.cartProducts.splice(indexToDelete, 1);
      console.log(this.getCartProducts)
    }
  }

  @computed
  public get getCart(): CartModel {
    return this.cart;
  }

  @computed
  public get getCartProducts(): CartProductModel[] {
    return toJS(this.cartProducts);
  }

  @computed
  public get getTotalPrice(): number {
    let total = this.getCartProducts.reduce((prev, current) => prev + current.totalPrice, 0);
    return total;
  }

  @computed 
  public get productTotalCount(): number {
    let count = 0;
    this.cartProducts.forEach(product => count += product.quantity);
    return count;
  }
}
