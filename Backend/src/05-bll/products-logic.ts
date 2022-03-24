import ClientError from '../03-Models/client-error';
import mongoose from 'mongoose';
import { IProductModel, ProductModel } from '../03-models/product-model';

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

async function addProduct(product: IProductModel): Promise<IProductModel> {
    // Validate product:
    const errors = product.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedProduct = product.save();
    return addedProduct;
}

async function updateProduct(product: IProductModel): Promise<IProductModel> {
    // Validate product:
    const errors = product.validateSync();
    if(errors) throw new ClientError(404, errors.message);

    // update:
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal: false}).exec();

    // Validate if product exist in DB:
    if(!updatedProduct) throw new ClientError(404, "Product is not found");

    return updatedProduct;
}

async function getProductsByCategoryId(_id: string): Promise<[]> {
    return [];
}

async function deleteProduct(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Delete:
    const deletedProduct = await ProductModel.findByIdAndDelete(_id);

    // Validate product found:
    if(!deletedProduct) throw new ClientError(404, "Product not found");
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
}