import express from "express";

import transactionController from "../controller/transaction.controller.js"
import auth from "../middleware/auth.js";

const transactionRoutes = express.Router();

transactionRoutes.post("/", auth,transactionController.createtransaction);
transactionRoutes.get("/",auth,transactionController.getAlltransaction)
transactionRoutes.put("/:id",auth,transactionController.updatetransactionById);
transactionRoutes.delete("/:id",auth,transactionController.deletetransactionById);
transactionRoutes.get("/Report",transactionController.getReport)



export default transactionRoutes;
