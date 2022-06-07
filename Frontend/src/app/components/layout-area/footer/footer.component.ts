import { Component } from '@angular/core';
import { OrdersState } from 'src/app/mobx/orders-state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public ordersState: OrdersState) { }

}
