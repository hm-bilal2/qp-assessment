import express from "express";
import { authenticateToken } from "../auth/jwt";
import * as adminController from "../controllers/adminController";

const router = express.Router();

router.post("/addItems", authenticateToken, adminController.addItems);
router.post("/removeItems", authenticateToken, adminController.removeItems);
router.post("/modifyItems", authenticateToken, adminController.modifyItems);

export default router;
