import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("groceryItem").del();

    await knex("groceryItem").insert([
        { id: 1, name: "milk" },
        { id: 2, name: "egg" },
        { id: 3, name: "bread" }
    ]);
};
