import { ProductsService } from 'src/app/services/products.service';
import { NotificationsService } from './../../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsState } from 'src/app/mobx/products-state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private productId: string;
  public product = new ProductModel();
  public categories: CategoryModel[];

  constructor(private categoriesService: CategoriesService, private notifications: NotificationsService,
              private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private productsState: ProductsState) { }

  async ngOnInit() {
    try{
      this.productId = this.activatedRoute.snapshot.paramMap.get("productId");
      this.product = await this.productsService.getOneProduct(this.productId);
      this.categories = await this.categoriesService.getAllCategories();
      if(!this.productsState.isProductsInMobx) {
        this.productsService.getAllProducts();
      }
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  public async editProduct() {
    try {
      await this.productsService.updateProduct(this.product);
      this.notifications.success("A new product has been update successfully");
      this.router.navigateByUrl("shop/all-products");
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

}
