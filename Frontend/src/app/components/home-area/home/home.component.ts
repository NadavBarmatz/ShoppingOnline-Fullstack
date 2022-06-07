import { NotificationsService } from './../../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private ordersService: OrdersService, private notifications: NotificationsService) { }

  async ngOnInit() {
    try {
      // used to show total orders amount on footer component: 
      await this.ordersService.getAllOrders();
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
}
