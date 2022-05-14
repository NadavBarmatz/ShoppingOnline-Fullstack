import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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

  // Used as properties of carousel lib:
  public getScreenWidth: any;
  public numberOfDisplayedItemsInCarousel: number = 5;

  constructor(private categoriesService: CategoriesService, private notifications: NotificationsService,
    private categoriesState: CategoriesState, public screenSize: ScreenSizeService) { }

  async ngOnInit() {
    try{
      // getting screen width to determine initial carousel properties:
      this.getScreenWidth = window.innerWidth;
      if(this.getScreenWidth > 1200) {
        this.numberOfDisplayedItemsInCarousel = 5;
      }
      if(this.getScreenWidth <= 1200 && this.getScreenWidth > 700) {
        this.numberOfDisplayedItemsInCarousel = 4;
      }
      if(this.getScreenWidth <= 700) {
        this.numberOfDisplayedItemsInCarousel = 3;
      }
      
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
  
  // getting screen width on resize to determine carousel properties:
  @HostListener('window:resize')
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth > 1200) {
      this.numberOfDisplayedItemsInCarousel = 5;
    }
    if(this.getScreenWidth <= 1200 && this.getScreenWidth > 700) {
      this.numberOfDisplayedItemsInCarousel = 4;
    }
    if(this.getScreenWidth <= 700) {
      this.numberOfDisplayedItemsInCarousel = 3;
    }
  }

}
