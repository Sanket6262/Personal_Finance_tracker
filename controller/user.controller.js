import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();




	
const registerUser = async (req, res) => {
	const { name, mobile,password } = req.body;
  console.log(req.body);
	try {
		const existingUser = await userModel.findOne({ mobile });

		if (!existingUser) {
			const user = new userModel({ name, mobile,password });
			const createdUser = await user.save();
			if (createdUser) {
				res.status(201).send(createdUser);
			}
		} else {
			console.log(`User already exists. User Request : `, req.body);
			res.status(400).send({
				message: "User already exists",
			});
		}
	} catch (e) {
		if (
			e.name == "ValidationError" &&
			e._message == "user validation failed"
		) {
			res.status(400).send({ message: "User is unknown" });
		}
		res.status(500).send(e);
	}
}; 

async function loginuser(req, res) {
	console.log(req.body);
	try {
	  const { mobile, password } = req.body;
	  const register = await userModel.findOne({ mobile });
	  if (!register || !(await register.matchPassword(password))) {
		return res.status(400).send({ error: "Invalid mobile or password" });
	  }
	  const token = jwt.sign({ _id: register._id }, "Sanket", { expiresIn: "1h" });
	  res.status(200).send({ register, token });
	} catch (error) {
	  res.status(500).send({
		message: error.message,
	  });
	}
  }



export default {registerUser,loginuser};