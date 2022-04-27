import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartState } from 'src/app/mobx/cart-state';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-logout',
  template: "<div></div>"
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notifications: NotificationsService,
    private cartState: CartState) { }

  ngOnInit(): void {
    this.authService.logout();
    this.cartState.deleteCart();
    this.cartState.deleteCartProducts();
    this.notifications.success("You have been logged-out");
    this.router.navigateByUrl("/home");
  }

}
