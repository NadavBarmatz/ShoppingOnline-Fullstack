import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartModel } from 'src/app/models/cart.model';
import { CityModel } from 'src/app/models/city.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { CitiesService } from 'src/app/services/cities.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Used for registration form:
  public user = new UserModel();
  // Used to determine form steps:
  public step: number = 1;
  // Used to populate the city select box:
  public cities: CityModel[];

  constructor(private authService: AuthService, private authState: AuthState, private router: Router, 
    private notifications: NotificationsService, private citiesService: CitiesService,
    private cartsService: CartsService) { }

  async ngOnInit(): Promise<void> {
    this.cities = await this.citiesService.getAllCities();
  }
  
    public nextStep(): void {
      this.step++;
    }

  public previous(): void {
    this.step--;
  }

  public async submit() {
    try {
      // Register:
      await this.authService.register(this.user);
      // Create user cart:
      const userCart = new CartModel();
      userCart.userId = this.authState.user._id;
      await this.cartsService.createNewUserCart(userCart);
      
      this.notifications.success("Registration has been succeeded. \n A cart has been created for you");
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

}
