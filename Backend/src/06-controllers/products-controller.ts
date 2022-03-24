import express, {NextFunction, Request, Response} from "express";
import {ProductModel} from "../03-models/product-model";
import logic from "../05-bll/products-logic";

const router = express.Router();

// Route for getting all :
router.get("/", async (request : Request, response : Response, next : NextFunction) => {
    try {
        const products = await logic.getAllProducts();
        response.json(products);
    } catch (err : any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id", async (request : Request, response : Response, next : NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await logic.getOneProduct(_id);
        response.json(product);
    } catch (err : any) {
        next(err);
    }
});

// Route for adding a :
router.post("/", async (request : Request, response : Response, next : NextFunction) => {
    try {
        const productToAdd = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(productToAdd);
        response.status(201).json(addedProduct);
    } catch (err : any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id", async (request : Request, response : Response, next : NextFunction) => {
    try {
        request.body._id = request.params._id;
        const productToUpdate = new ProductModel(request.body);
        const updatedProduct = await logic.updateProduct(productToUpdate);
        response.status(201).json(updatedProduct);
    } catch (err : any) {
        next(err);
    }
});

// Route for deleting a :
router.delete("/:_id", async (request : Request, response : Response, next : NextFunction) => {
    try {
        const idToDelete = request.params._id;
        await logic.deleteProduct(idToDelete);
        response.sendStatus(204);
    } catch (err : any) {
        next(err);
    }
});


export default router;
