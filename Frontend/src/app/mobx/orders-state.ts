import { Injectable } from "@angular/core";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { OrderModel } from "../models/order.model";


@Injectable({providedIn: "root"})
export class OrdersState {

    @observable
    public allOrders: OrderModel[] = [];
    
    // current order:
    @observable
    private currentOrderId: string;
    @observable
    private currentOrderPrice: number;
    
    constructor() {
        makeAutoObservable(this);
    }

    @action
    public saveAllOrders(orders: OrderModel[]) {
        this.allOrders = orders;
    }

    @computed
    public get ordersCount(): number {
        return this.allOrders.length;
    }
    
    @computed
    public set setCurrentOrderId(_id: string){
        this.currentOrderId = _id;
    }
    
    @computed
    public get getCurrentOrderId() {
        return this.currentOrderId;
    }
    
    public set setCurrentOrderPrice(price: number){
        this.currentOrderPrice = price;
    }
    
    @computed
    public get getCurrentOrderPrice() {
        return this.currentOrderPrice;
    }

}