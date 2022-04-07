import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartState } from 'src/app/mobx/cart-state';
import { CartModel } from 'src/app/models/cart.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = new CredentialsModel();

  constructor(private authService: AuthService, private router: Router, 
              private notify: NotifyService, private cartsService: CartsService, 
              private cartState: CartState, private authState: AuthState) { }

  public async login(): Promise<void> {
    try {
      await this.authService.login(this.credentials);
      this.notify.success("You are logged-in");

      // Check if cart exist in mobX:
      if(this.cartState.cart) return;

      // If cart not in mobX, get users cart:
      const existedCart = await this.cartsService.getCartByUser(this.authState.user._id);
      
      // If user has no cart, create and save to DB and mobX
      if(!existedCart) {
        const newCart = new CartModel();
        newCart.userId = this.authState.user._id;
        await this.cartsService.createCart(newCart);
      }

      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      this.notify.error(err);
    }
  }

}
