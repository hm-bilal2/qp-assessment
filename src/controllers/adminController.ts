import { Request, Response } from "express";
import db from "../database/db";
import { ModifiedReq } from "../models/ModifiedRequest";
import { User } from "../models/User";
import { GroceryItem } from "../models/GroceryItem";

export const addItem = async (req: Request, res: Response) => {
  try {
    const { username } = (req as ModifiedReq).decoded;
    const user: User | undefined = await db("users")
      .select()
      .where("username", username)
      .first();

    if (!user) {
      return res.status(400).json("user not found");
    }

    const { groceryItem }: { groceryItem: GroceryItem } = req.body;

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
