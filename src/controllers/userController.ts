import { Request, Response } from "express";
import db from "../database/db";
import { ModifiedReq } from "../models/ModifiedRequest";
import { User } from "../models/User";
import { GroceryItem } from "../models/GroceryItem";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { username, role } = (req as ModifiedReq).decoded;

    if (role !== "user") {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const user: User | undefined = await db("users")
      .select()
      .where("username", username)
      .first();

    if (!user) {
      return res.status(400).json("user not found");
    }

    let trx: any | undefined = undefined;

    const { items } = req.body;

    try {
      let unavailableItems: string[] = [];
      let totalCost = 0;
      trx = await db.transaction();

      await Promise.all(
        items.map(async (groceryItem: any) => {
          const groceryItemInDb: GroceryItem | undefined = await trx(
            "groceryItems"
          )
            .select()
            .where("barcodeNumber", groceryItem.barcodeNumber)
            .forUpdate()
            .first();

          if (groceryItemInDb) {
            if (groceryItemInDb.quantity > groceryItem.quantity) {
              await trx("groceryItems")
                .update(
                  "quantity",
                  groceryItemInDb.quantity - groceryItem.quantity
                )
                .where("barcodeNumber", groceryItem.barcodeNumber);
              totalCost += groceryItemInDb.price * groceryItem.quantity;
              console.log(
                `Item ${groceryItemInDb.barcodeNumber} quantity changed`
              );
            } else {
              unavailableItems.push(groceryItem.barcodeNumber);
            }
          }
        })
      );

      await trx.commit();

      res.status(200).json({
        message: "checkout successfull",
        totalCost,
        unavailableItems,
      });
      console.log("Grocery items checkout successfully within transaction");
    } catch (error) {
      console.error("Error checking out grocery item within transaction:", error);
      if (trx) {
        await trx.rollback(error);
      }
      return res.status(400).send(error);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
