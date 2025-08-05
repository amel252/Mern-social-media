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
        const user = await UserModel.login(email, password); // suppose que ta méthode login existe
        const token = createToken(user._id);
        // on crée un cookie qui s'appelle jtw
        res.cookie("jwt", token, { httpOnly: true, maxAge, path: "/" });
        res.status(200).json({
            message: "Utilisateur connecté",
            user: user._id,
        });
    } catch (err) {
        const errors = signInErrors(err);
        // res.status(401).json({ message: err.message });
        res.status(401).json({ errors });
    }
};
// ------------------supprimer
// module.exports.logout = (req, res) => {
//     // Tu remplaces le cookie jwt par une chaîne vide, et tu le fais expirer immédiatement (dans 1 milliseconde).
//     res.claearCookie("jwt", "", { maxAge: 1 });
//     res.status(200).json({ message: "Déconnexion réussie" });
//     // res.redirect("/");
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
// module.exports.logout = (req, res) => {
//     res.cookie("jwt", "", { maxAge: 1 });
//     req.session.destroy((err) => {
//         if (err)
//             return res.status(500).json({ message: "Erreur de déconnexion" });
//         res.status(200).json({ message: "Déconnexion réussie" });
//     });
// };
