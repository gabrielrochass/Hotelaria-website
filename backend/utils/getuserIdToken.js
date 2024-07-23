import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const getUserId = (token) => {
    if (token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.userId;
    }
    return false;
}