import express from "express";
import * as commonController from "../controllers/commonController";
import { authenticateToken } from "../auth/jwt";

const router = express.Router();

router.post("/signup", commonController.signup);
router.post("/login", commonController.login);
router.post("/viewAllItems", authenticateToken, commonController.viewAllItems);

export default router;
