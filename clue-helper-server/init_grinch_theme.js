require("dotenv").config();
const fs = require("fs");
const { Pool } = require("pg"); // Assuming you are using the pg library to connect to PostgreSQL

// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "cluehelper_db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function insertGrinchCards() {
  try {
    // Read JSON file containing card names categorized by type
    const rawData = fs.readFileSync("./data/grinch_cards.json");
    const cardsData = JSON.parse(rawData);

    // Iterate through each card type and its associated card names
    for (const [type, names] of Object.entries(cardsData)) {
      for (const name of names) {
        // Determine the type for each card based on the category (character, item, location)
        let cardType = "";
        switch (type) {
          case "character":
            cardType = "character";
            break;
          case "item":
            cardType = "item";
            break;
          case "location":
            cardType = "location";
            break;
          default:
            break;
        }

        // Insert card into the database under the theme "Grinch" with its respective type
        const query = `
          INSERT INTO cards (name, theme_id, type)
          VALUES ($1, (SELECT id FROM themes WHERE name = 'Grinch'), $2)
          RETURNING *;
        `;

        const values = [name, cardType];

        // Execute SQL query to insert card into the database
        const result = await pool.query(query, values);
        console.log(`Inserted ${type} card: ${name}`);
      }
    }

    console.log("All cards inserted successfully!");
  } catch (error) {
    console.error("Error inserting cards:", error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Call the function to insert Grinch cards
insertGrinchCards();
