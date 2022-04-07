import { Component, OnInit  } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartState } from 'src/app/mobx/cart-state';
import { CartModel } from 'src/app/models/cart.model';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  constructor(public authState: AuthState, private cartState: CartState, private cartsService: CartsService, private notifyService: NotifyService) { }

  async ngOnInit(): Promise<void> {
    try{
      
      // Check if cart exist in mobX:
      if(this.cartState.cart) return;
      // Check if user is logged-in:
      if(!this.authState.isLoggedIn) return;

      // If cart not in mobX, get users cart:
      const existedCart = await this.cartsService.getCartByUser(this.authState.user._id);
      
      // If user has no cart, create and save to DB and mobX
      if(!existedCart) {
        const newCart = new CartModel();
        newCart.userId = this.authState.user._id;
        await this.cartsService.createCart(newCart);
      }
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }  

}
