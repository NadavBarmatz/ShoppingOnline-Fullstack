import { Injectable } from "@angular/core";
import { action, computed, makeObservable, observable } from "mobx";
import { ProductModel } from "../models/product.model";


@Injectable({providedIn: "root"})
export class ProductsState {

    @observable.ref
    public products: ProductModel[] = [];
    
    constructor() {
        makeObservable(this);
    }

    @action
    public saveAllProducts(products: ProductModel[]) {
        this.products = products;
    }

    @action
    public addProduct(product: ProductModel) {
        this.products.push(product);
    }

    @action
    public updateProduct(product: ProductModel) {
        const indexToUpdate = this.products.findIndex(prod => prod._id === product._id);
        this.products[indexToUpdate] = product;
    }

    @action
    public deleteProduct(productId: string) {
        const indexToDelete = this.products.findIndex(prod => prod._id === productId);
        this.products.splice(indexToDelete, 1);
    }

    @computed
    public get isProductsInMobx(): boolean {
        return this.products.length !== 0;
    }

}