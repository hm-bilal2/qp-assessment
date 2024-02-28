import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("groceryItems", (table) => {
    table.renameColumn("admin_id", "lastUpdatedBy");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("groceryItems", (table) => {
    table.renameColumn("lastUpdatedBy", "admin_id");
  });
}
