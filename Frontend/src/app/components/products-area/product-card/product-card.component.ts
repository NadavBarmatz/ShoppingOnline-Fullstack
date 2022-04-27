import { NotificationsService } from './../../../services/notifications.service';
import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CartState } from 'src/app/mobx/cart-state';
import {MatDialog} from '@angular/material/dialog';
import {ProductModalComponent} from "../product-modal/product-modal.component"
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  public product: ProductModel;
  public quantity: number = 1;

  constructor(private notifications: NotificationsService, private cartState: CartState, public dialog: MatDialog,
    private cartsService: CartsService) { }

  public async addToCart() {
    try{
      const productToAdd = new CartProductModel();
      productToAdd.productId = this.product._id;
      productToAdd.quantity = this.quantity;
      productToAdd.shoppingCartId = this.cartState.cart._id;
      await this.cartsService.addProductToCart(productToAdd);
      this.notifications.success("This product ha been added to your shopping cart");
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  openDialog() {
    this.dialog.open(ProductModalComponent);
  }
}
