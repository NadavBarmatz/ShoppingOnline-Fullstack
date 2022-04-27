import { Injectable } from "@angular/core";
import { action, computed, makeObservable, observable } from "mobx";
import { UserModel } from "../models/user.model";
import jwtDecode from "jwt-decode";

@Injectable({providedIn: "root"})
export class AuthState{
    @observable
    public user: UserModel;

    @observable
    public token: string = null;

    constructor(){
        makeObservable(this);
        this.restoreTokenFromBrowser();
    }

    // Deal with registration
    @action
    public register(token: string) {
        this.token = token;
        const decodedData: any = jwtDecode(token);
        this.user = decodedData.user;
        this.storeTokenInBrowser(token);
    }

    // Deal with login
    @action
    public login(token: string) {
        this.token = token;
        const decodedData: any = jwtDecode(token);
        this.user = decodedData.user;
        this.storeTokenInBrowser(token);
    }

    // Deal with logout
    @action
    public logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
    }

    // Set token in local storage
    @action
    private storeTokenInBrowser(token: string) {
        localStorage.setItem("token", token);
    }

    // Get token from local storage and initiate mobX fields
    @action
    private restoreTokenFromBrowser() {
        const token = localStorage.getItem("token");
        if(token) {
            this.token = token;
            const decodedData: any = jwtDecode(token);
            this.user = decodedData.user;
        }
    }

    @computed
    public get isLoggedIn(): boolean {
        return this.token !== null;
    }

    @computed
    public get fullName(): string {
        return `${this.user.firstName} ${this.user.lastName}`;
    }

}