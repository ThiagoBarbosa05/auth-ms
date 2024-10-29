import { Router } from "express";
import { registerCustomerController } from "../controllers/register-customer";
import { authenticateCustomerController } from "../controllers/authenticate-customer";

export const customerRouter = Router();

customerRouter.post("/customer/register", registerCustomerController);
customerRouter.post("/customer/authenticate", authenticateCustomerController);
