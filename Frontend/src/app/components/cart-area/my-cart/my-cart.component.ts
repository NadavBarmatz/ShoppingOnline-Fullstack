import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CartState } from 'src/app/mobx/cart-state';
import { CartProductModel } from 'src/app/models/cart-product.model';
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

  public async deleteProductFromCart(cartProductId: string) {
    try{
      this.cartsService.deleteCartProduct(cartProductId);
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  public async handleQuantityChange(cartProduct: CartProductModel, target: any) {
    try{
      console.log(cartProduct, target.value);
      cartProduct.quantity = +target.value;
      cartProduct.totalPrice = cartProduct.quantity * cartProduct.product.price;
      await this.cartsService.updateProductInCart(cartProduct)
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  public handleCartDisplay() {
    this.seeCart = !this.seeCart;
    this.isCartClicked.emit();
  }

}
