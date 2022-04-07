import { Component, Input, OnInit } from '@angular/core';
import { CartState } from 'src/app/mobx/cart-state';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartProductsService } from 'src/app/services/cart-products.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: ProductModel;
  public quantity: number = 1;

  constructor(private cartProductsService: CartProductsService, private notifyService: NotifyService, private cartState: CartState) { }

  ngOnInit(): void {
    console.log("Product: ", this.product)
  }

  public async addToCart() {
    try{
      const productToAdd = new CartProductModel();
      productToAdd.productId = this.product._id;
      productToAdd.quantity = this.quantity;
      productToAdd.shoppingCartId = this.cartState.cart._id;
      await this.cartProductsService.addProductToCart(productToAdd);
      this.notifyService.success("This product ha been added to your shopping cart");
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

}
