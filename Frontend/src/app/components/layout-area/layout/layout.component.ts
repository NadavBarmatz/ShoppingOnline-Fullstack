import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/mobx/auth-state';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private authState: AuthState, private cartsService: CartsService, private productsService: ProductsService) { }
  async ngOnInit() {
      if(this.authState.isLoggedIn){
        await this.cartsService.validateCartExistenceAndCreateIfNoExist();
        await this.productsService.getAllProducts();
      }
  }

}
