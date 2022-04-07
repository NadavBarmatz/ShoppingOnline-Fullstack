import { CityModel } from "./city.model";

export class UserModel {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public password: string;
    public role: string;
    public street: string;
    public cityId: string;
    public city: CityModel;
}