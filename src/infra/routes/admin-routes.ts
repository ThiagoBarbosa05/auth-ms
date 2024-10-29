import { Router } from "express";
import { authenticateAdminController } from "../controllers/authenticate-admin";

export const adminRouter = Router();

adminRouter.post("/admin/authenticate", authenticateAdminController);
