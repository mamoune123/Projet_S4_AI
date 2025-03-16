const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "supersecret"; // ⚠️ À stocker dans .env



// Inscription
router.post("/register",
  [
    body("username").trim().notEmpty().withMessage("Le nom d'utilisateur est requis"),
    body("email").trim().isEmail().withMessage("Email invalide"),
    body("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    body("role").isIn(["admin", "user"]).withMessage("Le rôle doit être 'admin' ou 'user'"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array()); // 🔍 Voir les erreurs dans la console
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.createUser(username, email, hashedPassword, role);
      
      // ✅ Réponse avec un message de succès et les infos du user (sans le password)
      res.status(201).json({ 
        message: "Inscription réussie !",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
  

// Connexion
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
