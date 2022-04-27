import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriesState } from '../mobx/categories-state';
import { ProductsState } from '../mobx/products-state';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = environment.urls.categories;

  constructor(private http: HttpClient, private categoriesState: CategoriesState) { }

  public async getAllCategories(): Promise<CategoryModel[]> {
    const categories = await firstValueFrom(this.http.get<CategoryModel[]>(this.categoriesUrl));
    this.categoriesState.saveCategories(categories);
    return categories;
  }
  
  public async addCategories(category: CategoryModel): Promise<CategoryModel> {
    const addedCategory = await firstValueFrom(this.http.post<CategoryModel>(this.categoriesUrl, category));
    this.categoriesState.addCategory(addedCategory);
    return addedCategory;
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(this.categoriesUrl + categoryId));
    this.categoriesState.deleteCategory(categoryId);
  }
}
