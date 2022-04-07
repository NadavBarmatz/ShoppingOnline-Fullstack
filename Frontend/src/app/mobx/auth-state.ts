import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { action, computed, makeObservable, observable } from "mobx";
import { UserModel } from "../models/user.model";



@Injectable({providedIn: "root"})
export class AuthState {
    @observable
    public user: UserModel = null;

    @observable
    public token: string = null;

    public constructor() {
        makeObservable(this);
        this.restoreTokenInBrowser();
    }

    @action
    public register(token: string): void {
        this.token = token;
        const decodedData: any = jwtDecode(token);
        this.user = decodedData.user;
        this.storeTokenInBrowser();
    }

    @action
    public login(token: string): void {
        this.token = token;
        const decodedData: any = jwtDecode(token);
        this.user = decodedData.user;
        this.storeTokenInBrowser()
    }

    @action 
    public logout(): void {
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
    }

    @computed
    public get isLoggedIn(): boolean {
        return this.token !== null;
    }

    @computed
    public get fullName(): string {
        return `${this.user.firstName} ${this.user.lastName}`
    }

    private storeTokenInBrowser(): void {
        localStorage.setItem("token", this.token);
    }

    private restoreTokenInBrowser(): void {
        this.token = localStorage.getItem("token");
        if(this.token) {
            const decodedData: any = jwtDecode(this.token);
            this.user = decodedData.user;
        }
    }
}