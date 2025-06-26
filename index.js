// on importe Express et mongoose
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser"); plus utilisé
const userRoutes = require("./routes/user.route");
// Tu charges les variables d’environnement depuis le fichier .env situé dans le dossier config/.
require("dotenv").config({ path: "./config/.env" });
// crées une instance de l’application Express , sur (app) que tu vas :définir des routes (app.get, app.post), ajouter des middlewares (app.use(...)) , connecter à une base de données, etc.
const app = express();

//Body-parser remplacer par :
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// le lien de mongoose avec le bdd atlas
mongoose
    .connect(process.env.MONGO)

    .then(() => console.log("Connexion à MongoDB Atlas réussie ✅ !"))
    .catch((err) => {
        console.error(" Erreur de connexion à MongoDB  ❌ :", err.message);
        process.exit(1); // Stoppe le serveur si la connexion échoue
    });

// les routes :
app.use("/api/user", userRoutes);

//Tu dis à Express de démarrer le serveur sur le port 5000./ toujours  a la fin
app.listen(process.env.PORT, () => {
    console.log(`listing on port ${process.env.PORT}`);
});
