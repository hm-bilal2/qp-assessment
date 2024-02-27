import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.enu("role", ["user", "admin"]).notNullable().defaultTo("user");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
