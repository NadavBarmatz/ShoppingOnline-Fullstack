import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartState } from '../mobx/cart-state';
import { EmailModel } from '../models/email.model';
import { OrderModel } from '../models/order.model';
import { CartsService } from './carts.service';
import { EmailsService } from './emails.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl = environment.urls.orders;

  constructor(private http: HttpClient, private cartState: CartState, private cartsService: CartsService,
    private emailsService: EmailsService ) { }

  public async getAllOrders(): Promise<OrderModel[]> {
    const orders = await firstValueFrom(this.http.get<OrderModel[]>(this.ordersUrl)); 
    return orders;
  }

  public async createOrder(order: OrderModel): Promise<OrderModel> {
    const newOrder = await firstValueFrom(this.http.post<OrderModel>(this.ordersUrl, order)); 
    return newOrder;
  }

  public async checkout(order: OrderModel, receiptEmail: EmailModel){
    order.finalPrice = this.cartState.getTotalPrice;
    order.shoppingCartId = this.cartState.cart._id;
    await this.createOrder(order);
    this.emailsService.sendMail(receiptEmail);
    await this.cartsService.DeleteCart(this.cartState.cart._id);
  }
}

