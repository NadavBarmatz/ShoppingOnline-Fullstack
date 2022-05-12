import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import safeDelete from '../01-utils/safe-delete';
import { IProductModel, ProductModel } from '../03-models/product-model';
import path from 'path';
import fs from "fs"

async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category");
}

async function getOneProduct(_id: string): Promise<IProductModel> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);
    
    const product = await ProductModel.findById(_id).populate("category").exec();
    
    // Validate product existence:
    if(!product) throw new ClientError(404, "Product not found");
    
    return product;
}

async function getProductsByCategory(_id: string): Promise<IProductModel[] | any> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    const products = await ProductModel.find({"categoryId": _id}).populate("category").exec();

    // If empty throw error:
    if(products.length === 0) throw new ClientError(404, "There are no products in the requested category");

    return products;
}

async function addProduct(product: IProductModel): Promise<IProductModel> {
    // Validate product:
    const errors = product.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // 1.  take original extension:
    const extension = product.image.name.substring(product.image.name.lastIndexOf("."));
    // 2. create uuid file name:
    product.imageName = uuid() + extension;
    // 3. save to disk:
    await product.image.mv("./src/00-DB/Images/" + product.imageName);
    // 4. delete image b4 sending back to front:
    product["image"] = undefined;
    
    // Force save auto validation to ignore the deleted image property:
    product.$ignore("image")
    // Save:
    const addedProduct = await product.save();
    console.log(addedProduct.imageName)
    return addedProduct;
}

async function updateProduct(product: IProductModel): Promise<IProductModel> {
    // Validate product:
    const errors = product.validateSync(["productName", "categoryId", "price"]);
    if(errors) throw new ClientError(404, errors.message);
    
    // Get product from DB for image usage:
    const productToUpdate = await getOneProduct(product._id);
    
    // Validate if product exist in DB:
    if(!productToUpdate) throw new ClientError(404, "Product is not found");

    // 1. set image name:
    product.imageName = productToUpdate.imageName;
    // 2. if we have an image to update:
    if(product.image) {
        // 3. delete prev image from DB:
        safeDelete("./src/00-DB/Images/" + product.imageName);
        // 4. take original extension:
        const extension = product.image.name.substring(product.image.name.lastIndexOf("."));
        // 5. create uuid file name:
        product.imageName = uuid() + extension;
        // 6. save to disk:
        product.image.mv("./src/00-DB/Images/" + product.imageName);
        // 7. delete image b4 sending back to front:
        product["image"] = undefined;

    }

    // update:
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal: false}).exec();

    return updatedProduct;
}

async function deleteProduct(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // 0. get product prom DB for the imageName use
    const productToDelete = await getOneProduct(_id);
    // Validate if product exist in DB:
    if(!productToDelete) throw new ClientError(404, "Product is not found");
    // delete image from db:
    safeDelete("./src/00-DB/Images/" + productToDelete.imageName)

    // Delete:
    const deletedProduct = await ProductModel.findByIdAndDelete(_id);

    // Validate product found:
    if(!deletedProduct) throw new ClientError(404, "Product not found");
}

export default {
    getAllProducts,
    getOneProduct,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct
}