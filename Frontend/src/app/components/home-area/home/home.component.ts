import { CartsService } from 'src/app/services/carts.service';
import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authState: AuthState, private cartsService: CartsService) { }

  async ngOnInit() {
    // if(this.authState.isLoggedIn) {
    //   await this.cartsService.validateCartExistenceAndCreateIfNoExist();
    // }
  }

}
