import { Request } from 'express';
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { IUserModel } from "../03-models/user-model";
import config from "./config";

const secretKey = "Shop_here_ThankU-please"

// Generate new token:
function getNewToken(user: IUserModel): string {
    const payload = { user };
    const token = jwt.sign(payload, secretKey, {expiresIn: config.loginExpiresIn});

    return token;
}

// Check if there is a valid token:
function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try{
            // Check if there is the correct header:
            if(!request.headers.authorization) {
                resolve(false);
                return;
            }

            const token = request.headers.authorization.substring(7);

            // Check if there is token:
            if(!token) {
                resolve(false);
                return;
            }

            // jwt verification of the token:
            jwt.verify(token, secretKey, (err: VerifyErrors, payload: JwtPayload) => {
                if(err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch(err: any) {
            reject(err);
        }
        
    });
}

// After verification:
function getUserFromToken(request: Request): IUserModel {

    // Extract token from request header:
    const token = request.headers.authorization.substring(7);

    // Decode token:
    const payload = jwt.decode(token);

    // Extract user from decoded token:
    const user = (payload as any).user;

    return user;
}

export default {
    getNewToken,
    verifyToken,
    getUserFromToken
}