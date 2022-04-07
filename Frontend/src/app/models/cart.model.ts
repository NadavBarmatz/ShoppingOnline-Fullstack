import { UserModel } from "./user.model";

export class CartModel {
    public _id: string;
    public userId: string;
    public creationDate: string;
    public user: UserModel;
}