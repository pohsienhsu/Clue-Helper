require("dotenv").config();

// Import pg-promise library
const pgp = require("pg-promise")();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

console.log(dbConfig);

// Create a new database instance
const db = pgp(dbConfig);

// Test database connection function
const testDatabaseConnection = async () => {
  try {
    // Query a sample record from a table (e.g., Themes table)
    const result = await db.any("SELECT * FROM themes");

    // Log the result to the console
    console.log("Database Connection Test Successful:", result);
  } catch (error) {
    // Log any errors to the console
    console.error("Database Connection Test Failed:", error);
  } finally {
    // Close the database connection
    pgp.end();
  }
};

// Call the testDatabaseConnection function to test the database connection
testDatabaseConnection();
