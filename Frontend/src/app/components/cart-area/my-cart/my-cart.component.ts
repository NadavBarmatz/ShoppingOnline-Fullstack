import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CartState } from 'src/app/mobx/cart-state';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {  
  @Output()
  public isCartClicked = new EventEmitter();
  
  @Input()
  public seeCart: boolean = false;

  constructor(public cartState: CartState, private cartsService: CartsService, private notifications: NotificationsService) { }

  public deleteProductFromCart(cartProductId: string) {
    this.cartsService.deleteCartProduct(cartProductId);
  }

  public handleCartDisplay() {
    this.seeCart = !this.seeCart;
    this.isCartClicked.emit();
  }

}
