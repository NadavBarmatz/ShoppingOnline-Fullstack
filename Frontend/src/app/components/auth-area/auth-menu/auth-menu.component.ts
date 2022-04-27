import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartState } from 'src/app/mobx/cart-state';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  constructor(public authState: AuthState, public cartState: CartState) { }

  ngOnInit(): void {
  }

}
