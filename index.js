// on importe Express
const express = require("express");

// Tu charges les variables d’environnement depuis le fichier .env situé dans le dossier config/.
require('dotenv').config({ path: './config/.env' })

// Tu crées une instance de l’application Express , C’est sur cette instance (app) que tu vas :définir des routes (app.get(...), app.post(...)), ajouter des middlewares (app.use(...)) , connecter à une base de données, etc.
const app = express();

//Tu dis à Express de démarrer le serveur sur le port 5000.
app.listen(process.env.PORT, () => {
    console.log(`listing on port ${process.env.PORT}`);

})