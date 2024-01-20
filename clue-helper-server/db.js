require("dotenv").config();

const pgp = require("pg-promise")();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "cluehelper_db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Create  a new database instance
const db = pgp(dbConfig);

module.exports = db;
