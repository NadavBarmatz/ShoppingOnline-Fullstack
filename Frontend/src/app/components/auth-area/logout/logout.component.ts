import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartState } from 'src/app/mobx/cart-state';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-logout',
  template: "<div></div>"
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notifications: NotificationsService,
    private cartState: CartState, private cartsService: CartsService) { }

  async ngOnInit(): Promise<void> {
    // Check if cart is empty, if so delete from db
    if(this.cartState.getCartProducts.length === 0) {
      await this.cartsService.DeleteCart(this.cartState.cart._id);
    }
    // Just in case delete cart from mobx:
    this.cartState.deleteCart();
    this.authService.logout();
    this.notifications.success("You have been logged-out");
    this.router.navigateByUrl("/home");
  }

}
