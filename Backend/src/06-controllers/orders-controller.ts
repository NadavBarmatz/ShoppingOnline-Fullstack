import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyToken from "../02-middleware/verify-token";
import { OrderModel } from "../03-models/order-model";
import logic from "../05-bll/orders-logic";

const router = express.Router();

// Route for getting all :
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
       const orders = await logic.getAllOrders();
       response.json(orders);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const order = await logic.getOneOrder(_id);
       response.json(order);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const orderToAdd = new OrderModel(request.body);
        const addedOrder = await logic.addOrder(orderToAdd);
        response.status(201).json(addedOrder);
    }
    catch(err: any) {
        next(err);
    }
});


// Route for deleting a :
router.delete("/:_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const idToDelete = request.params._id;
        await logic.deleteOrder(idToDelete);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
