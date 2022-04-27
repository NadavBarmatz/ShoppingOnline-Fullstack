import { Injectable } from '@angular/core';
import { observable, makeObservable, action, computed } from 'mobx';
import { CategoryModel } from '../models/category.model';

@Injectable({providedIn: "root"})
export class CategoriesState {
     
    @observable
    public categories: CategoryModel[] = null;

    constructor() {
        makeObservable(this);
    }

    @action
    public saveCategories(categories: CategoryModel[]) {
        this.categories = categories;
    }

    @action
    public addCategory(category: CategoryModel) {
        this.categories.push(category);
    }

    @action
    public deleteCategory(categoryId: string) {
        const indexToDelete = this.categories.findIndex(category => category._id === categoryId);
        this.categories.splice(indexToDelete, 1);
    }

    @computed
    public get isCategoriesSavedInMobx(): boolean {
        return this.categories !== null;
    }
}