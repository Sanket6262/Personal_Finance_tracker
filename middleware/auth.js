import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usermodel from "../model/user.model.js";
dotenv.config();

const authMiddleware = (model) => {
    function auth (req,res, next){
        const token = req.headers['authorization'];
        console.log(token);
        if (!token) {
            return res.status(403).json({message:"no token authorization access denied"});
        }
        const splitToken = token.split(' ')[1]
        console.log(splitToken);
    
        jwt.verify(splitToken, 'Sanket', (err, decoded) => {
            if(err) {
                return res.status(401).send({message: "Token is not valid"});
            }
            req.userId = decoded._id; // Store the decoded uer ID in the request object
            next();
        });
    }
};
export default authMiddleware;
