import knex from "knex";
import knexFile from "../../knexfile";

const environment = process.env.NODE_ENV || "development";

const db = knex(knexFile[environment]);

export default db;