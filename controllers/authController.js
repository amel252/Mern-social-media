const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
    // body-parser : un middleware pour Express qui permet de lire et traiter les données envoyées dans le corps des requêtes HTTP
    if (!pseudo || !email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });
    }
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (error) {
        console.error(error); // Pour voir l'erreur dans la console serveur
        res.status(500).json({ error: error.message });
    }
};

// function signIn (connexion ):
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Champs requis manquants." });

    try {
        const user = await UserModel.login(email, password); // suppose que ta méthode login existe
        const token = createToken(user._id);
        // on crée un cookie qui s'appelle jtw
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({
            message: "Utilisateur connecté",
            user: user._id,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
module.exports.logout = (req, res) => {
    // Tu remplaces le cookie jwt par une chaîne vide, et tu le fais expirer immédiatement (dans 1 milliseconde).
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Déconnexion réussie" });
    res.redirect("/");
};
