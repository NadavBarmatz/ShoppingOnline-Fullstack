import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connectToMongoDB();
import authController from "./06-controllers/auth-controller";
import usersController from "./06-controllers/users-controller";
import categoriesController from "./06-controllers/categories-controller";
import citiesController from "./06-controllers/cities-controller";
import productsController from "./06-controllers/products-controller";
import shoppingCartsController from "./06-controllers/shopping-carts-controller";
import cartProductsController from "./06-controllers/cart-products-controller";
import ordersController from "./06-controllers/orders-controller";
import errorsHandler from "./02-middleware/errors-handler";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/auth", authController);
server.use("/api/users", usersController);
server.use("/api/categories", categoriesController);
server.use("/api/cities", citiesController);
server.use("/api/products", productsController);
server.use("/api/carts", shoppingCartsController);
server.use("/api/cart-products", cartProductsController);
server.use("/api/orders", ordersController);
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));
      
