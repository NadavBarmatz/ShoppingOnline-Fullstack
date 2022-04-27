import { CategoriesService } from 'src/app/services/categories.service';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesState } from 'src/app/mobx/categories-state';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css']
})
export class CategoriesFilterComponent implements OnInit {

  public categories: CategoryModel[];
  public categoriesNamesForImages: string[] = [];

  constructor(private categoriesService: CategoriesService, private notifications: NotificationsService,
    private categoriesState: CategoriesState) { }

  async ngOnInit() {
    try{
      if(!this.categoriesState.isCategoriesSavedInMobx){
        this.categories = await this.categoriesService.getAllCategories();
      }
      else{
        this.categories = this.categoriesState.categories;
      }
      this.categories.forEach(category => this.categoriesNamesForImages.push(category.name))
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

}
