import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartState } from '../mobx/cart-state';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private urls = environment.urls;

  constructor(private http: HttpClient, private cartState: CartState) { }
  
  public async createCart(cart: CartModel): Promise<void> {
    await firstValueFrom(this.http.post<CartModel>(this.urls.carts, cart));
    this.cartState.updateCart(cart);
  }
  
  public async getCart(cartId: string): Promise<CartModel> {
    const cart = await firstValueFrom(this.http.get<CartModel>(this.urls.carts + cartId));
    this.cartState.updateCart(cart);
    return cart;
  }
  
  public async getCartByUser(userId: string): Promise<CartModel> {
    const cart = await firstValueFrom(this.http.get<CartModel>(this.urls.cartsByUser + userId));
    this.cartState.updateCart(cart);
    return cart;
  }

  public async deleteCart(cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(this.urls.carts + cartId));
    this.cartState.deleteCart();
  }

}
