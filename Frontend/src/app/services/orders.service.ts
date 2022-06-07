import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartState } from '../mobx/cart-state';
import { EmailModel } from '../models/email.model';
import { OrderModel } from '../models/order.model';
import { CartsService } from './carts.service';
import { EmailsService } from './emails.service';
import { CartModel } from '../models/cart.model';
import { AuthState } from '../mobx/auth-state';
import { OrdersState } from '../mobx/orders-state';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl = environment.urls.orders;

  constructor(private http: HttpClient, private cartState: CartState, private cartsService: CartsService,
    private emailsService: EmailsService, private authState: AuthState, private ordersState: OrdersState) { }

  public async getAllOrders(): Promise<OrderModel[]> {
    const orders = await firstValueFrom(this.http.get<OrderModel[]>(this.ordersUrl)); 
    // save to mobX:
    this.ordersState.saveAllOrders(orders);
    return orders;
  }

  public async getOneOrder(_id: string): Promise<OrderModel> {
    const order = await firstValueFrom(this.http.get<OrderModel>(this.ordersUrl + _id)); 
    return order;
  }

  private async createOrder(order: OrderModel): Promise<OrderModel> {
    const newOrder = await firstValueFrom(this.http.post<OrderModel>(this.ordersUrl, order)); 
    return newOrder;
  }

  public async checkout(order: OrderModel): Promise<OrderModel>{
    // setting the order:
    order.finalPrice = this.cartState.getTotalPrice;
    order.shoppingCartId = this.cartState.cart._id;
    // creating the order in DB:
    const newOrder = await this.createOrder(order);
    
    // create and send receipt email:
    await this.emailsService.createReceiptEmail(order);
    // delete cart from DB:
    await this.cartsService.deleteCart(this.cartState.cart._id);
    // create new cart:
    const newCart = new CartModel();
    newCart.userId = this.authState.user._id;
    await this.cartsService.createNewUserCart(newCart);

    return newOrder;
  }
}

