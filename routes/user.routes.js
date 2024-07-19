import express from "express";

import userController from "../controller/user.controller.js"

const userRoutes = express.Router();

userRoutes.post("/",userController.registerUser);
userRoutes.post("/login",userController.loginuser);

export default userRoutes;