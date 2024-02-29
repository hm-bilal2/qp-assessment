import express from "express";
import { authenticateToken } from "../auth/jwt";
import * as adminController from "../controllers/adminController";

const router = express.Router();

router.post("/addItem", authenticateToken, adminController.addItem);
router.post("/removeItems", authenticateToken, adminController.removeItems);
router.post("/modifyItems", authenticateToken, adminController.modifyItems);

export default router;
