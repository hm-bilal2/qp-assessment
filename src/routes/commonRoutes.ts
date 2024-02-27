import express from "express";
import * as commonController from "../controllers/commonController";

const router = express.Router();

router.post("/createUser", commonController.createUser);
router.post("/login", commonController.login);

export default router;
