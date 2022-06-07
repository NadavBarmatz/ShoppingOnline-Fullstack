import express, { NextFunction, Request, Response } from "express";
import receiptMaker from "../05-bll/receipt-logic";
import orderLogic from "../05-bll/orders-logic"
import verifyToken from "../02-middleware/verify-token";
const router = express.Router();

router.get("/:orderId", verifyToken, async(request: Request, response: Response, next: NextFunction)=>{
    try{
        const orderId = request.params.orderId;
        const order = await orderLogic.getOneOrder(orderId);
        const absolutePath = await receiptMaker(order);
        response.status(200).sendFile(absolutePath)
    }
    catch(err: any) {
        next(err);
    }
})

export default router;