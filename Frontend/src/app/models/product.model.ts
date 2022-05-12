import { CategoryModel } from "./category.model";

export class ProductModel {
   public _id: string;
   public productName: string;
   public categoryId: string;
   public price: number;
   public category: CategoryModel;
   public imageName: string;
   public image: File;

}