import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private authState: AuthState, private cartsService: CartsService) { }
  async ngOnInit() {
      if(this.authState.isLoggedIn){
        await this.cartsService.validateCartExistenceAndCreateIfNoExist();
      }
  }

}
