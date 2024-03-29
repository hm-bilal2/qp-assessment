import { Request, Response } from "express";
import db from "../database/db";
import { ModifiedReq } from "../models/ModifiedRequest";
import { User } from "../models/User";
import { GroceryItem } from "../models/GroceryItem";

export const addItems = async (req: Request, res: Response) => {
  try {
    const { username, role } = (req as ModifiedReq).decoded;

    const user: User | undefined = await db("users")
      .select()
      .where("username", username)
      .first();

    if (!user) {
      return res.status(400).json("user not found");
    }

    if (role !== "admin") {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const { groceryItems }: { groceryItems: GroceryItem[] } = req.body;

    let trx: any | undefined = undefined;

    try {
      trx = await db.transaction();

      await Promise.all(
        groceryItems.map(async (groceryItem: any) => {
          const groceryItemInDb: GroceryItem | undefined = await trx(
            "groceryItems"
          )
            .select()
            .where("barcodeNumber", groceryItem.barcodeNumber)
            .forUpdate()
            .first();

          if (groceryItemInDb) {
            await trx("groceryItems")
              .update({
                quantity: groceryItemInDb.quantity + groceryItem.quantity,
                lastUpdatedBy: user.id,
              })
              .where("barcodeNumber", groceryItem.barcodeNumber);
          } else {
            await trx("groceryItems").insert({
              ...groceryItem,
              lastUpdatedBy: user.id,
            });
          }
        })
      );
      await trx.commit();

      res.status(200).json({
        message: "Successfully added item(s)",
        groceryItems,
      });
      console.log(
        "Grocery item inserted/updated successfully within transaction"
      );
    } catch (error) {
      console.error("Error inserting grocery item within transaction:", error);
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

export const removeItems = async (req: Request, res: Response) => {
  const { username, role } = (req as ModifiedReq).decoded;

  const user: User | undefined = await db("users")
    .select()
    .where("username", username)
    .first();

  if (!user) {
    return res.status(400).json("user not found");
  }

  if (role !== "admin") {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  const { groceryItems } = req.body;

  let trx: any | undefined = undefined;

  try {
    trx = await db.transaction();

    await Promise.all(
      groceryItems.map(async (groceryItem: any) => {
        const groceryItemInDb: GroceryItem | undefined = await trx(
          "groceryItems"
        )
          .select()
          .where("barcodeNumber", groceryItem.barcodeNumber)
          .forUpdate()
          .first();

        if (groceryItemInDb) {
          if (
            groceryItemInDb.quantity &&
            groceryItemInDb.quantity > groceryItem.quantity
          ) {
            await trx("groceryItems")
              .update(
                "quantity",
                groceryItemInDb.quantity - groceryItem.quantity
              )
              .where("barcodeNumber", groceryItem.barcodeNumber);
            console.log(
              `Item ${groceryItemInDb.barcodeNumber} quantity changed`
            );
          } else {
            await trx("groceryItems")
              .where("barcodeNumber", groceryItem.barcodeNumber)
              .del();
            console.log(`Item ${groceryItemInDb.barcodeNumber} deleted`);
          }
        }
      })
    );

    await trx.commit();

    res.status(200).json({
      message: "Successfully deleted item(s)",
    });
    console.log(
      "Grocery item deleted/updated quantity successfully within transaction"
    );
  } catch (error) {
    console.error(
      "Error deleting/updating grocery item within transaction:",
      error
    );
    if (trx) {
      await trx.rollback(error);
    }
    return res.status(400).send(error);
  }
};

export const modifyItems = async (req: Request, res: Response) => {
  const { username, role } = (req as ModifiedReq).decoded;

  const user: User | undefined = await db("users")
    .select()
    .where("username", username)
    .first();

  if (!user) {
    return res.status(400).json("user not found");
  }

  if (role !== "admin") {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  const { items } = req.body;

  let unvailableItems: String[] = [];
  let availableItems: String[] = [];

  let trx: any | undefined = undefined;

  try {
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
          const fields: any = {};

          groceryItem.fields.forEach((field: any) => {
            fields[field.fieldName] = field.newValue;
          });

          await trx("groceryItems")
            .update(fields)
            .where("barcodeNumber", groceryItem.barcodeNumber);

          availableItems.push(groceryItem.barcodeNumber);

          console.log(`Item ${groceryItemInDb.barcodeNumber} quantity changed`);
        } else {
          unvailableItems.push(groceryItem.barcodeNumber);
        }
      })
    );

    await trx.commit();

    res.status(200).json({
      message: `Successfully modified [${availableItems}]. Unavailable items: [${unvailableItems}]`,
    });
  } catch (error) {
    console.error(
      "Error deleting/updating grocery item within transaction:",
      error
    );
    if (trx) {
      await trx.rollback(error);
    }
    return res.status(400).send(error);
  }
};
