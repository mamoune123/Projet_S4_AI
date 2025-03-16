const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/tasks", authenticate, authorize(["admin"]), async (req, res) => {
  // Création d'une tâche (seulement admin)
});
