import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartState } from 'src/app/mobx/cart-state';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CheckOutComponent } from '../../check-out-area/check-out/check-out.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {  
  @Output()
  public isCartClicked = new EventEmitter();
  
  @Input()
  public seeCart: boolean = false;

  public isSideCart: boolean = true;

  constructor(public cartState: CartState, private cartsService: CartsService, private notifications: NotificationsService,
    public dialog: MatDialog, private router: Router) { }

    ngOnInit(): void {
      if(this.router.url === "/my-cart") {
        this.isSideCart = false;
      }
    }

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

  public openCheckoutDialog() {
    const dialogRef = this.dialog.open(CheckOutComponent)
  }

}
