import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../mobx/auth-state';
import { CartState } from '../mobx/cart-state';
import { CartProductModel } from '../models/cart-product.model';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private urls = {
    cartByUser: environment.urls.cartsByUser,
    cartProducts: environment.urls.cartProducts,
    allCarts: environment.urls.carts
  }

  constructor(private http: HttpClient, private cartState: CartState, private authState: AuthState) { }

  public async validateCartExistenceAndCreateIfNoExist() {
    if(this.cartState.cart) return;
    const user = this.authState.user;
    if(!user) return;
    let cartFromDB = await this.getUserCart(user._id);
    if(!cartFromDB) {
      cartFromDB = new CartModel();
      cartFromDB.userId = this.authState.user._id;
      await this.createNewUserCart(cartFromDB);
    }    
    await this.getCartProducts(cartFromDB._id);
  }

  public async createNewUserCart(cart: CartModel): Promise<CartModel>{
    // Create new cart in DB
    const addedCart = await firstValueFrom(this.http.post<CartModel>(this.urls.allCarts, cart));
    // Save To MobX
    this.cartState.saveCart(addedCart);
    return addedCart;
  }

  public async getUserCart(userId: string): Promise<CartModel> {
    // Get From DB
    const cart = await firstValueFrom(this.http.get<CartModel>(this.urls.cartByUser + userId));
    // Save To MobX
    this.cartState.saveCart(cart);
    return cart;
  }

  public async getCartProducts(cartId: string): Promise<CartProductModel[]> {
    // Get From DB
    const cartProducts = await firstValueFrom(this.http.get<CartProductModel[]>(this.urls.cartProducts + cartId));
    // Save To MobX
    this.cartState.saveCartProducts(cartProducts);
    return cartProducts;
  }

  public async addProductToCart(cartProduct: CartProductModel): Promise<CartProductModel> {
    // Add product to cart in DB
    const addedCartProduct = await firstValueFrom(this.http.post<CartProductModel>(this.urls.cartProducts, cartProduct));
    // get all cart products to update mobx correctly:
    const cartProducts = await this.getCartProducts(cartProduct.shoppingCartId);
    this.cartState.saveCartProducts(cartProducts)
    return addedCartProduct;
  }

  public async DeleteCart(cartId: string): Promise<void> {
    // Delete From DB
    await firstValueFrom(this.http.delete<void>(this.urls.allCarts + cartId));
    // Delete From MobX
    this.cartState.deleteCart();
  }

  public async deleteCartProduct(cartProductId: string): Promise<void> {
    // Delete From DB
    await firstValueFrom(this.http.delete<void>(this.urls.cartProducts + cartProductId));
    // Delete From MobX
    this.cartState.deleteCartProduct(cartProductId);
  }
  
}
