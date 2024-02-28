import express from "express";
import { authenticateToken } from "../auth/jwt";
import * as adminController from "../controllers/adminController";

const router = express.Router();

router.post("/addItem", authenticateToken, adminController.addItem);
router.post("/viewAllItems", authenticateToken, adminController.viewAllItems)

export default router;
