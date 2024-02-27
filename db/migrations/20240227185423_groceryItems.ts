import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('groceryItems', (table) => {
        table.string('barcodeNumber').unique().notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('groceryItems', (table) => {
        table.dropColumn('barcodeNumber');
      });
}

