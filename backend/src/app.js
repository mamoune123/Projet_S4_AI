const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());  // ✅ Obligatoire pour lire le JSON
app.use(express.urlencoded({ extended: true })); // ✅ Permet de lire les requêtes x-www-form-urlencoded

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;
