import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CitiesService } from 'src/app/services/cities.service';
import { NotifyService } from 'src/app/services/notify.service';

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

  constructor(private authService: AuthService, private router: Router, private notify: NotifyService, private citiesService: CitiesService) { }

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
      await this.authService.register(this.user);
      this.notify.success("Registration has been succeeded");
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      this.notify.error(err);
    }
  }

}
