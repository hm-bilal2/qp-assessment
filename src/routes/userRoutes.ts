import express from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../auth/jwt";

const router = express.Router();

router.post("/checkout", authenticateToken, userController.checkout);

export default router;
