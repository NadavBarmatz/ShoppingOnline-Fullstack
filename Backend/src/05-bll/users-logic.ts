
import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { IUserModel, UserModel } from '../03-models/user-model';

async function getAllUsers(): Promise<IUserModel[]> {
    return UserModel.find().populate("city");
}

async function getOneUser(_id: string): Promise<IUserModel> {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    // Get user:
    const user = await UserModel.findById(_id).populate("city").exec();

    // Validate user existence:
    if(!user) throw new ClientError(404, "User not found");

    return user;
}

async function addUser(user: IUserModel): Promise<IUserModel> {
    // Validation:
    const errors = user.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // save
    const addedUser = user.save();
    return addedUser;
}

async function updateUser(user: IUserModel): Promise<IUserModel> {
    // Validation:
    const errors = user.validateSync();
    if(errors) throw new ClientError(404, errors.message);
    
    // Update:
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {returnOriginal: false}).exec();

    // Validate if user exist in DB:
    if(!updatedUser) throw new ClientError(404, "user is not found");

    return updatedUser;
}

async function deleteUser(_id: string): Promise<void> {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    const deletedUser = await UserModel.findByIdAndDelete(_id).exec();

    if(!deletedUser) throw new ClientError(404, "user is not found");
}


export default {
    getAllUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser
};
