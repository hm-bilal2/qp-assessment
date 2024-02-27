import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("groceryItems", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("brand").notNullable();
    table.float("price").notNullable();
    table.integer("quantity").notNullable();
    table.integer("admin_id").unsigned();

    table.timestamps(true, true);

    table.foreign("admin_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("groceryItems");
}
