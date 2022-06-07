import { EmailModel } from './../03-models/email-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/email-logic";
import verifyToken from '../02-middleware/verify-token';

const router = express.Router();

router.post("/", verifyToken, async(request: Request, response: Response, next: NextFunction)=>{
    try{
        const email = new EmailModel();
        email.subject = request.body.subject;
        email.body = request.body.body;
        email.to = request.body.to;
        logic.send(email);
        response.sendStatus(201);
    }
    catch(err: any) {
        next(err);
    }
})

export default router;