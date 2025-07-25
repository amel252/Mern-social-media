const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const userRoutes = require("../back-end/routes/user.routes");
const postRoutes = require("../back-end/routes/post.routes");

require("dotenv").config({ path: "../back-end/config/.env" });

const app = express();

app.use(cookieParser());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "sessionId"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD, PATCH, POST, DELETE",
    preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "maSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

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
