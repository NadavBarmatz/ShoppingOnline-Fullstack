import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartModel } from 'src/app/models/cart.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = new CredentialsModel();

  constructor(private authService: AuthService, private router: Router, private cartsService: CartsService,
              private notifications: NotificationsService,private authState: AuthState) { }

  public async login(): Promise<void> {
    try {
      await this.authService.login(this.credentials);
      
      // Get user cart from DB. if not exist, create one:
      await this.cartsService.validateCartExistenceAndCreateIfNoExist();
      
      this.notifications.success("You are logged-in");
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      console.log(err)
      this.notifications.error(err);
    }
  }

}
