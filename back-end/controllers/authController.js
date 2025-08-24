const { Error } = require("mongoose");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        // notre token va expiré dans 3jrs (24*60*60*1000 = 24h)
        expiresIn: maxAge,
    });
};

// function signUp (inscription)
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;

    if (!pseudo || !email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });
    }

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        // Duplication (email ou pseudo déjà utilisé)
        if (err.code === 11000) {
            return res.status(400).json({
                errors: {
                    email: err.keyPattern.email
                        ? "Cet email est déjà enregistré."
                        : "",
                    pseudo: err.keyPattern.pseudo
                        ? "Ce pseudo est déjà pris."
                        : "",
                },
            });
        }

        // Autres erreurs
        console.error("Erreur lors de l'inscription :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
//------------------signin
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Champs requis manquants." });

    try {
        // Vérifie dans MongoDB avec ta méthode login définie dans user.model.js
        const user = await UserModel.login(email, password);

        // Crée token
        const token = createToken(user._id);

        // Envoie le cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true si HTTPS
            sameSite: "lax",
            maxAge: maxAge,
        });

        res.status(200).json({
            message: "Utilisateur connecté",
            user: user._id,
        });
    } catch (err) {
        const errors = signInErrors(err);
        res.status(401).json({ errors });
    }
};

// module.exports.signIn = async (req, res) => {
//     const { email, password } = req.body;

//     // Trouve utilisateur
//     const user = await UserModel.login(email, password);
//     if (!user) {
//         return res.status(401).json({ message: "Identifiants invalides" });
//     }

//     // Crée token JWT
//     const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
//         expiresIn: "1d",
//     });

//     // Envoie cookie
//     res.cookie("jwt", token, {
//         httpOnly: true,
//         secure: false, // true en prod HTTPS
//         sameSite: "lax", // ou 'none' en cross-origin + HTTPS
//         maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ message: "Connexion réussie" });
// };

module.exports.logout = (req, res) => {
    res.clearCookie("jwt", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });
    res.status(200).json({ message: "Déconnecté" });
};
