const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // Mets `true` si tu es sur un serveur distant (comme Render ou Railway)
});

pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch(err => console.error("❌ Erreur de connexion à PostgreSQL :", err.message));

module.exports = pool;
