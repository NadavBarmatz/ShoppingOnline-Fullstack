
import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../03-models/user-model";
import logic from "../05-bll/users-logic";

const router = express.Router();

// Route for getting all users:
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const users = await logic.getAllUsers();
        response.json(users);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one user:
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const user = await logic.getOneUser(_id);
        response.json(user);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a user:
router.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const userToAdd = new UserModel(request.body);
        const addedUser = await logic.addUser(userToAdd);
        response.status(201).json(addedUser);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a user:
router.put("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const userToUpdate = new UserModel(request.body);
        const updatedUser = await logic.updateUser(userToUpdate);
        response.status(201).json(updatedUser);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a user:
router.delete("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        await logic.deleteUser(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
