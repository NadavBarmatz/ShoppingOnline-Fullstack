
import { NextFunction, Request, Response } from "express";
import { getError } from "../01-utils/error-helper";
import ClientError from "../03-models/client-error";

function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {
// Crash, like throw...: 
if(err instanceof Error) {
    const errorMessage = getError(err); 
    response.status((err as any).status || 500).send(errorMessage);
    return;
}

// Client error: 
if(err instanceof ClientError) {
    response.status(err.status).send(err.message);
        return;
    }

    next();
}


export default errorsHandler;
