import jwt from "../01-utils/jwt";
import ClientError from "../03-models/client-error";
import { ICredentialsModel } from "../03-models/credentials-model";
import { IUserModel } from "../03-models/user-model";
import userLogic from "./users-logic";

// Register:
async function register(user: IUserModel): Promise<string> {
    
    // Using user logic:
    const newUser = await userLogic.addUser(user);
    
    // Delete password before generating token for security:
    user.password = undefined;

    // Create new token:
    const token = jwt.getNewToken(newUser);

    return token;

}

// Login:
async function login(credentials: ICredentialsModel): Promise<string> {
    
    // Validate:
    const errors = credentials.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Using user logic;
    const users = await userLogic.getAllUsers();

    // Check if user exist in database:
    const user =  users.find(u => u.username === credentials.username && u.password === credentials.password);
    if(!user) throw new ClientError(401, "Incorrect username of password");

    // Delete password before generating token for security:
    user.password = undefined;
    
    const token = jwt.getNewToken(user);

    return token;
}

export default {
    register,
    login
}