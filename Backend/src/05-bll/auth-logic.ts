import jwt from "../01-utils/jwt";
import ClientError from "../03-models/client-error";
import { ICredentialsModel } from "../03-models/credentials-model";
import { IUserModel, UserModel } from '../03-models/user-model';
import {hashing} from "../01-utils/hash-passwords";


// Register:
async function register(user: IUserModel): Promise<string> {
    // Hash password:
    user.password = hashing(user.password);

    // validate:
    const errors = user.validateSync();
    if(errors) throw new ClientError(404, errors.message);
    
    // Validate username and email does not exist in DB:
    const users = await getAllUsers();
    const exist = users.find(u => u.username === user.username || u.email === user.email);
    if (exist) throw new ClientError(401, "User name or email already in use.");
    
    // Using user logic:
    // const newUser = await userLogic.addUser(user);
    const newUser = await user.save();
    
    // Delete password before generating token for security:
    user.password = undefined;

    // Create new token:
    const token = jwt.getNewToken(newUser);

    return token;
}

// Login:
async function login(credentials: ICredentialsModel): Promise<string> {
    // Hash password:
    credentials.password = hashing(credentials.password);


    // Validate:
    const errors = credentials.validateSync();
    if(errors) throw new ClientError(404, errors.message);

    // Using user logic;
    const users = await getAllUsers();
    
    // Check if user exist in database:
    const user =  users.find(u => u.username === credentials.username && u.password === credentials.password);
    if(!user) throw new ClientError(401, "Incorrect username or password");
    
    // Delete password before generating token for security:
    user.password = undefined;
    
    const token = jwt.getNewToken(user);

    return token;
}

// used for validations of both register and login functions:
async function getAllUsers(): Promise<IUserModel[]> {
    return UserModel.find().populate("city");
}

export default {
    register,
    login
}