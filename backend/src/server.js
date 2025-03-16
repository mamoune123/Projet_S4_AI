const app = require("./app");
const initDB = require("./config/dbinit");

const PORT = process.env.PORT || 5000;

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  }).catch((err) => {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      err
    );
    process.exit(1);
  });