import { CityModel } from './../03-models/city-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/cities-logic";

const router = express.Router();

// Route for getting all :
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
       const cities = await logic.getAllCities();
       response.json(cities);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const city = await logic.getOneCity(_id);
       response.json(city);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cityToAdd = new CityModel(request.body);
        const addedCity = await logic.addCity(cityToAdd);
        response.status(201).json(addedCity);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const cityToUpdate = new CityModel(request.body);
        const updatedCity = await logic.updateCity(cityToUpdate);
        response.status(201).json(updatedCity);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a :
router.delete("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        await logic.deleteCity(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
