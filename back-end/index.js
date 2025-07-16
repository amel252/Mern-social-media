// on importe Express et mongoose
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser"); plus utilisé
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
// Tu charges les variables d’environnement depuis le fichier .env situé dans le dossier config/.
require("dotenv").config({ path: "./config/.env" });
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors")
// crées une instance de l’application Express , sur (app) que tu vas :définir des routes (app.get, app.post), ajouter des middlewares (app.use(...)) , connecter à une base de données, etc.
const app = express();
const path = require("path");

// Cookie parser → DOIT être avant les middlewares qui lisent les cookies
app.use(cookieParser());

//cors et spécifié qui a le droit  pulbié
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD, PATCH, POST, DELETE',
    'preflightContinue': false

}
app.use(cors({ corsOptions }));

// Middleware auth → ici c'est safe maintenant
app.use(checkUser);
// jtw
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//Body-parser remplacer par express:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// pour l'img avatar, // Serve les fichiers statiques (images)
app.use(
    "/uploads",
    express.static(path.join(__dirname, "client/public/uploads"))
);

// le lien de mongoose avec le bdd atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à MongoDB Atlas réussie ✅ !"))
    .catch((err) => {
        console.error(" Erreur de connexion à MongoDB  ❌ :", err.message);
        process.exit(1); // Stoppe le serveur si la connexion échoue
    });

// les routes :
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//Tu dis à Express de démarrer le serveur sur le port 5000./ toujours  a la fin
app.listen(process.env.PORT, () => {
    console.log(`listing on port ${process.env.PORT}`);
});
