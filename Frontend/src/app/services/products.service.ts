import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsState } from '../mobx/products-state';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urls = {
    products: environment.urls.products,
    productByCategory: environment.urls.productsByCategory
  }

  constructor(private http: HttpClient, private productsState: ProductsState) { }

  public async getAllProducts(): Promise<ProductModel[]> {
    // Get From DB
    const products = await firstValueFrom(this.http.get<ProductModel[]>(this.urls.products));
    // Update MobX
    this.productsState.saveAllProducts(products);
    return products; 
  }

  public async getOneProduct(productId: string): Promise<ProductModel> {
    const product = await firstValueFrom(this.http.get<ProductModel>(this.urls.products + productId));
    return product;
  }

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    // Add To DB
    const addedProduct = await firstValueFrom(this.http.post<ProductModel>(this.urls.products, product));
    // Update MobX
    this.productsState.addProduct(addedProduct);
    return addedProduct;
  }

  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    // Update DB
    const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(this.urls.products + product._id, product));
    // Update MobX
    this.productsState.updateProduct(updatedProduct);
    return updatedProduct;
  }

  public async deleteProduct(productId: string): Promise<void> {
    // Delete From DB
    await firstValueFrom(this.http.delete<void>(this.urls.products + productId));
    // Update MobX
    this.productsState.deleteProduct(productId);
  }

  public filterProducts(keyWord: string): ProductModel[] {
    const filteredProducts = this.productsState.products.filter(product => product.category?.name.toLocaleLowerCase() === keyWord.toLocaleLowerCase());
    return filteredProducts; 
  }
}
