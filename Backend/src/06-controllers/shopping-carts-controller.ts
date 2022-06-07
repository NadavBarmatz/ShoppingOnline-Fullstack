import express, { NextFunction, Request, Response } from "express";
import verifyToken from "../02-middleware/verify-token";
import { ShoppingCartModel } from "../03-models/shopping-cart-model";
import logic from "../05-bll/shopping-cart-logic";

const router = express.Router();

// Route for getting all :
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
       const carts = await logic.getAllCarts();
       response.json(carts);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const cart = await logic.getOneCart(_id);
        response.json(cart);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one by userId :
router.get("/by-user/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const userId = request.params.userId;
        const cart = await logic.getOneCartByUserId(userId);
        response.json(cart);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const now = new Date().toLocaleString();
        request.body.creationDate = now;
        request.body.isOpen = true;
        const cartToAdd = new ShoppingCartModel(request.body);
        const addedCart = await logic.addCart(cartToAdd);
        response.status(201).json(addedCart);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const cartToUpdate = new ShoppingCartModel(request.body);
        const updatedCart = await logic.updateCart(cartToUpdate);
        response.status(201).json(updatedCart);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a :
router.delete("/:_id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const idToDelete = request.params._id;
        await logic.deleteCart(idToDelete);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
