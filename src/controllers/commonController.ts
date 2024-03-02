import { Request, Response } from "express";
import { generateToken } from "../auth/jwt";
import db from "../database/db";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { GroceryItem } from "../models/GroceryItem";
import { validateUser } from "../helpers/userHelpers";
import { ModifiedReq } from "../models/ModifiedRequest";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user }: { user: User } = req.body;

    const isUserInvalid: Object | null = validateUser(user);

    if (isUserInvalid) {
      return res.status(400).json(isUserInvalid);
    }

    const encryptedPassword: String = bcrypt.hashSync(
      user.password,
      Number(process.env.SALT)
    );

    // transaction
    let trx: any | undefined = undefined;

    try {
      trx = await db.transaction();
      await trx("users").insert({ ...user, password: encryptedPassword });
      await trx.commit();

      console.log("User inserted successfully within transaction");
    } catch (error) {
      console.error("Error inserting user within transaction:", error);
      if (trx) {
        await trx.rollback(error);
      }
      return res.status(400).send(error);
    }
    // transaction end

    res.status(200).json({
      message: "Successfully inserted user",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await db("users").select().where("username", username).first();

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication Failed: User not found" });
    }

    const isPasswordMatched: boolean = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token: string = generateToken(username, password, user.role);
    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const viewAllItems = async (req: Request, res: Response) => {
  try {
    const { username } = (req as ModifiedReq).decoded;

    const user: User | undefined = await db("users")
      .select()
      .where("username", username)
      .first();

    if (!user) {
      return res.status(400).json("user not found");
    }

    const groceryItems: GroceryItem[] = await db("groceryItems");

    res.status(200).json(
      user.role === "admin"
        ? groceryItems
        : groceryItems.map(({ name, brand, price }) => ({
            name,
            brand,
            price,
          }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
