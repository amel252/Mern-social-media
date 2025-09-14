const mongoose = require("mongoose");
const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//----------------- TOKEN -----------------
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3jours
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

//----------------- SIGNUP -----------------
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    if (!pseudo || !email || !password)
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });

    try {
        // Hash du mot de passe avant création
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            pseudo,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ user: user._id });
    } catch (err) {
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
        console.error("Erreur lors de l'inscription :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

//----------------- LOGIN -----------------
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Champs requis manquants." });

    try {
        // cherche dans la base de données un utilisateur dont le champ email correspond à celui fourni.// Si un utilisateur est trouvé, il est stocké dans la variable user.

        const user = await UserModel.findOne({ email });
        if (!user) throw Error("email incorrect");

        // Si l’utilisateur existe (non nul), on continue pour vérifier le mot de passe,compare va comparer le mail dans BD haché stocké  et le password fourni
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) throw Error("password incorrecte");

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: maxAge,
        });
        // si tout est ok
        res.status(200).json({
            message: "Utilisateur connecté",
            user: user._id,
        });
    } catch (err) {
        res.status(401).json({ errors: err.message });
    }
};

//----------------- LOGOUT -----------------
module.exports.logout = (req, res) => {
    res.clearCookie("jwt", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });
    res.status(200).json({ message: "Déconnecté" });
};
