const fs = require("fs");
const path = require("path");
const pool = require("./database");

async function initDB() {
  try {
    const sql = fs.readFileSync(path.join("/Users/mac/Downloads/task-manager/database/schema.sql"), "utf8");
    await pool.query(sql);
    console.log("Base de données initialisée avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données 1 :",
      error.message
    );
  }
}
module.exports = initDB;