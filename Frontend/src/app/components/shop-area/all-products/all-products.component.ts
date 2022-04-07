import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  public products: ProductModel[];

  async ngOnInit() {
    try{
      this.products = await this.productsService.getAllProducts();
    }
    catch(err: any) {
      alert(err.message)
    }
  }

}
