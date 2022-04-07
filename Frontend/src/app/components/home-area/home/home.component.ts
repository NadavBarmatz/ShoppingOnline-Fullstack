import { Component } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartState } from 'src/app/mobx/cart-state';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
}
