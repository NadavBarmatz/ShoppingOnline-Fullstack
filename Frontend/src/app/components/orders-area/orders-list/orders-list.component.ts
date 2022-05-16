import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  public orderId: string;
  public requiredOrder: OrderModel;

  constructor(private ordersService: OrdersService, private notifications: NotificationsService) { }

  ngOnInit(): void {
  }

  public async getOneOrderById() {
    try{
      this.requiredOrder = await this.ordersService.getOneOrder(this.orderId);
      console.log(this.requiredOrder)
    }
    catch(err:any) {
      this.notifications.error(err)
    }
  }

}