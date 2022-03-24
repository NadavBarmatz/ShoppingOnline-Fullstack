import express, { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../03-models/category-model";
import logic from "../05-bll/categories-logic";

const router = express.Router();

// Route for getting all :
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
       const categories = await logic.getAllCategories();
       response.json(categories);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const category = await logic.getOneCategory(_id);
        response.json(category);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const categoryToAdd = new CategoryModel(request.body);
        const addedCategory = await logic.addCategory(categoryToAdd);
        response.status(201).json(addedCategory);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const categoryToUpdate = new CategoryModel(request.body);
        const updatedCategory = await logic.updateCategory(categoryToUpdate);
        response.status(201).json(updatedCategory);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a :
router.delete("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const idToDelete = request.params._id;
        await logic.deleteCategory(idToDelete);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
