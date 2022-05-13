import { CitiesService } from './../../../services/cities.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartState } from 'src/app/mobx/cart-state';
import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';
import { AuthState } from 'src/app/mobx/auth-state';
import { OrderModel } from 'src/app/models/order.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  constructor(public cartState: CartState, private citiesService: CitiesService, 
    public authState: AuthState, private notifications: NotificationsService,
    private ordersService: OrdersService, public dialogRef: MatDialogRef<CheckOutComponent> ) { }

  public cities: CityModel[];
  public order = new OrderModel();

  async ngOnInit() {
    this.cities = await this.citiesService.getAllCities();
    this.order.cityId = this.authState.user.cityId;
    this.order.street = this.authState.user.street;
  }

  public async checkOut(): Promise<void> {
    try {
      await this.ordersService.checkout(this.order);
      this.notifications.success("Your order is being processed");
      this.dialogRef.close();      
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
  

}
