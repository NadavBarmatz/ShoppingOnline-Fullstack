import { Router } from '@angular/router';
import { AuthState } from 'src/app/mobx/auth-state';
import { NotificationsService } from './../../../services/notifications.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CartState } from 'src/app/mobx/cart-state';
import {MatDialog} from '@angular/material/dialog';
import {ProductModalComponent} from "../product-modal/product-modal.component"
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartsService } from 'src/app/services/carts.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Output()
  public forceCartTabHoverEffect = new EventEmitter();

  @Input()
  public product: ProductModel;
  public quantity: number = 1;

  public imagesUrl = environment.urls.productsImages;

  constructor(private notifications: NotificationsService, private cartState: CartState, public dialog: MatDialog,
    private cartsService: CartsService, public authState: AuthState, private productsService: ProductsService,
    private router: Router) { }

  public async addToCart() {
    try{
      const productToAdd = new CartProductModel();
      productToAdd.productId = this.product._id;
      productToAdd.quantity = this.quantity;
      productToAdd.shoppingCartId = this.cartState.cart._id;
      await this.cartsService.addProductToCart(productToAdd);
      this.notifications.success("This product ha been added to your shopping cart");

      this.forceCartTabHoverEffect.emit();
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  openDialog() {
    this.dialog.open(ProductModalComponent);
  }

  editProduct(productId: string){
    this.router.navigateByUrl("edit-product/" + productId)
  }

  async deleteProduct(productId: string) {
    try{
      await this.productsService.deleteProduct(productId)
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
}
