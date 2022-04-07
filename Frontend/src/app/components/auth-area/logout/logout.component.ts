import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartState } from 'src/app/mobx/cart-state';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-logout',
  template: ""
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private notify: NotifyService, private router: Router, private cartState: CartState) { }

  ngOnInit(): void {
    this.authService.logout();
    this.cartState.deleteCart();
    this.notify.success("You are logged-out");
    this.router.navigateByUrl("/home");
  }

}
