import express, { NextFunction, Request, Response } from "express";
import verifyToken from "../02-middleware/verify-token";
import { CartProductModel } from "../03-models/cart-product-model";
import logic from "../05-bll/cart-products-logic";

const router = express.Router();

// Route for getting all :
router.get("/by-cart/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartId = request.params.cartId;
        const cartProd = await logic.getAllCartProducts(cartId);
        response.json(cartProd);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartProdToAdd = new CartProductModel(request.body);
        const addedCartProd = await logic.addCartProduct(cartProdToAdd);
        response.status(201).json(addedCartProd);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const cartProdToUpdate = new CartProductModel(request.body);
        const updatedCartProd = await logic.updateCartProduct(cartProdToUpdate);
        response.status(201).json(updatedCartProd);
    }
    catch(err: any) {
        next(err);
    }
}); 

// Route for deleting a :
router.delete("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const idToDelete = request.params._id;
        await logic.deleteCartProduct(idToDelete);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/by-cart/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartId = request.params.cartId;
        await logic.deleteCartProductsByCartId(cartId);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
})


export default router;
