import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connectToMongoDB();
import authController from "./06-controllers/auth-controller";
import categoriesController from "./06-controllers/categories-controller";
import citiesController from "./06-controllers/cities-controller";
import productsController from "./06-controllers/products-controller";
import shoppingCartsController from "./06-controllers/shopping-carts-controller";
import cartProductsController from "./06-controllers/cart-products-controller";
import emailsController from "./06-controllers/email-controller";
import receiptController from "./06-controllers/receipt-controller";
import ordersController from "./06-controllers/orders-controller";
import errorsHandler from "./02-middleware/errors-handler";
import expressFileUpload from "express-fileupload";
import ClientError from "./03-models/client-error";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api/auth", authController);
server.use("/api/categories", categoriesController);
server.use("/api/cities", citiesController);
server.use("/api/products", productsController);
server.use("/api/carts", shoppingCartsController);
server.use("/api/cart-products", cartProductsController);
server.use("/api/orders", ordersController);
server.use("/api/emails", emailsController);
server.use("/api/receipt", receiptController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    const clientErr = new ClientError(404, "Route Not Found");
    next(clientErr); // Will jump to the Catch-All Middleware
});

server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));
      
