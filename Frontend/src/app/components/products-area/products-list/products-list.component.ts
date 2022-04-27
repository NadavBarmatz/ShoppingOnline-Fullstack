import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsState } from 'src/app/mobx/products-state';
import { ProductModel } from 'src/app/models/product.model';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: ProductModel[];

  private filterKeyWord: string;

  public isCartShown: boolean = false;

  constructor(private productsState: ProductsState, private productsService: ProductsService, 
    private notifications: NotificationsService, private cartsService: CartsService, private route: ActivatedRoute) { }

  async ngOnInit() {
    try{
      // Get user cart from DB. if not exist, create one:
      await this.cartsService.validateCartExistenceAndCreateIfNoExist();

      if(!this.productsState.isProductsInMobx) {
        // get products from db:
        this.products = await this.productsService.getAllProducts();
      }
      else {
        // get products from mobx:
        this.products = this.productsState.products;
      }
      // Subscribe to route params for filtering products:
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.filterKeyWord = params.get("keyWord");
        if(this.filterKeyWord != null) {
          this.products = this.productsService.filterProducts(this.filterKeyWord)
        }
      })
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  public cartClicked() {
    this.isCartShown = !this.isCartShown;
  }

}
