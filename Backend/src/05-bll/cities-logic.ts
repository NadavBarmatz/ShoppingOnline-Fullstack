import ClientError from '../03-Models/client-error';
import mongoose from 'mongoose';
import { CityModel, ICityModel } from '../03-models/city-model';

async function getAllCities(): Promise<ICityModel[]> {
    return CityModel.find().exec();
}

async function getOneCity(_id: string): Promise<ICityModel> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    const city = await CityModel.findById(_id).exec();

    // Validate category existence:
    if(!city) throw new ClientError(404, "City not found");

    return city;
}

async function addCity(city: ICityModel): Promise<ICityModel> {
    // Validate city:
    const errors = city.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedCity = city.save();
    return addedCity;
}

async function updateCity(city: ICityModel): Promise<ICityModel> {
    // Validate city:
    const errors = city.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // update:
    const updatedCity = await CityModel.findByIdAndUpdate(city._id, city, {returnOriginal: false}).exec();

    // Validate if user exist in DB:
    if(!updatedCity) throw new ClientError(404, "City is not found");

    return updatedCity;
}

async function getUsersByCityId(_id: string): Promise<[]> {
    return [];
}

async function deleteCity(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Validate city empty:
    const userByCity = await getUsersByCityId(_id);
    if(userByCity.length !== 0) throw new ClientError(400, "There are still some users in that city, you cannot delete it until its empty");

    // Delete:
    const deletedCity = await CityModel.findByIdAndDelete(_id);

    // Validate category found:
    if(!deletedCity) throw new ClientError(404, "City not found");
}

export default {
    getAllCities,
    getOneCity,
    addCity,
    updateCity,
    deleteCity
}