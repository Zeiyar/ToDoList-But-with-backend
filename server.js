const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.log(".env manquant");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(process.env.PORT ||3000, () =>
      console.log(`🚀 Serveur en ligne sur le port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erreur MongoDB :", err));
