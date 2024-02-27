import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("admin").del();

    await knex("admin").insert([
        { id: 1, name: "Admin1" }
    ]);
};
