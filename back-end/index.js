require("dotenv").config({ path: __dirname + "/config/.env" });
//  Modules externes :

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
// Modules locaux:
const userRoutes = require("../back-end/routes/user.routes");
const postRoutes = require("../back-end/routes/post.routes");

//  Initialisation de l'app
const app = express();

// middleware:

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(cookieParser());
// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// servir les fichiers du dossier uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à MongoDB Atlas réussie ✅ !"))
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB  ❌ :", err.message);
        process.exit(1);
    });

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
