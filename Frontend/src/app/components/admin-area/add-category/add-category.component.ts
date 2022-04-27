import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category = new CategoryModel();

  constructor(private categoriesService: CategoriesService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit(): void {
  }

  public async addCategory() {
    try {
      await this.categoriesService.addCategory(this.category);
      this.notifications.success("New category has been added");
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

}
