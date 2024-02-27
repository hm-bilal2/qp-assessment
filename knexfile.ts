import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

interface KnexConfig {
  [key: string]: Knex.Config;
}

const config: KnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "my_database",
    },
    migrations: {
      directory: "./db/migrations",
    },
  },
};

export default config;