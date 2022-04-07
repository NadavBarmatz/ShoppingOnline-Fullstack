import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urls = environment.urls;

  constructor(private http: HttpClient) { }

  public async getAllProducts(): Promise<ProductModel[]> {
    const products = await firstValueFrom(this.http.get<ProductModel[]>(this.urls.products));
    return products;
  }

}
