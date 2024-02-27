import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, name: "user1" },
        { id: 2, name: "user2" },
        { id: 3, name: "user3" },
    ]);
};
