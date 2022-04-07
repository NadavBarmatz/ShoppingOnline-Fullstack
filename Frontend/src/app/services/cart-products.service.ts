import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProductModel } from '../models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private urls = environment.urls;

  constructor(private http: HttpClient) { }

  public async addProductToCart(prod: CartProductModel): Promise<void> {
    await firstValueFrom(this.http.post<CartProductModel>(this.urls.cartProducts, prod));
  }

  public async DeleteProductFromCart(prodId: string): Promise<void> {
    await firstValueFrom(this.http.delete(this.urls.cartProducts + prodId));
  }

}
