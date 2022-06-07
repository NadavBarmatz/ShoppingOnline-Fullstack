import { NotificationsService } from '../../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { ProductsState } from 'src/app/mobx/products-state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product = new ProductModel();
  public categories: CategoryModel[];

  constructor(private categoriesService: CategoriesService, private notifications: NotificationsService,
              private productsService: ProductsService, private router: Router, private productsState: ProductsState) { }

  async ngOnInit() {
    // getting all categories from server:
    this.categories = await this.categoriesService.getAllCategories();
    // Make sure products are stored in mobX:
    if(!this.productsState.isProductsInMobx) {
      this.productsService.getAllProducts();
    }
  }

  public async addProduct() {
    try {
      await this.productsService.addProduct(this.product);
      this.notifications.success("A new product has been added");
      this.router.navigateByUrl("shop/all-products");
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

}
