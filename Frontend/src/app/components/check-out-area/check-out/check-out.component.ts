import { CitiesService } from './../../../services/cities.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartState } from 'src/app/mobx/cart-state';
import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';
import { AuthState } from 'src/app/mobx/auth-state';
import { OrderModel } from 'src/app/models/order.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CreditCardRegex } from 'src/app/models/regular-expressions';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { OrdersState } from 'src/app/mobx/orders-state';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  constructor(public cartState: CartState, private citiesService: CitiesService, 
    public authState: AuthState, private notifications: NotificationsService,
    private ordersService: OrdersService, public dialogRef: MatDialogRef<CheckOutComponent>,
    public dialog: MatDialog, private ordersState: OrdersState
    ) {  }
    
    public cities: CityModel[];
    public order = new OrderModel();
    public minDate: string;
    public creditCardRegex = CreditCardRegex;
    public cartProductsList: CartProductModel[] = [];

    public regexText = "";

    async ngOnInit() {
      // getting cart products from mobX:
      this.cartProductsList = this.cartState.getCartProducts;
      // setting minimum date for validation purposes:
      const now = new Date().toISOString();
      this.minDate = now.split("T")[0];
      // initial delivery date is today:
      this.order.deliveryDate = this.minDate;
      // getting all cities from server to populate select box:
      this.cities = await this.citiesService.getAllCities();
      // initializing order properties with user fields:
      this.order.cityId = this.authState.user.cityId;
      this.order.street = this.authState.user.street;
  }

  public async checkOut(): Promise<void> {
    try {
      // setting order price in order state for receipt uses:
      this.ordersState.setCurrentOrderPrice = this.cartState.getTotalPrice;
      // setting order for receipt uses:
      this.order.shoppingCartId = this.cartState.cart._id;
      const order = await this.ordersService.checkout(this.order);
      // setting order id in order state for receipt uses:
      this.ordersState.setCurrentOrderId = order._id;
      
      this.notifications.success("Your order is being processed, and a receipt has been sent to you email");
      this.dialogRef.close();
      this.dialog.open(ConfirmationComponent);
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
}
