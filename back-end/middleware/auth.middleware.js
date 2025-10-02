const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/**
 * Middleware qui vérifie si un utilisateur est connecté
 * et met l'utilisateur dans res.locals.user (disponible dans les vues / middlewares suivants).
 */
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide" });
        }

        try {
            const user = await UserModel.findById(decodedToken.id).select(
                "-password"
            );
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Utilisateur non trouvé" });
            }
            res.locals.user = user;
            req.userId = decodedToken.id;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    });
};

/**
 * Middleware qui protège les routes privées :
 * - Vérifie que l'utilisateur possède un token valide
 * - Si OK, attache l'id utilisateur à req.userId
 */
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log("Aucun token fourni");
        return res.status(401).json({ error: "Accès refusé : pas de token" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            console.log("Token invalide :", err.message);
            return res.status(401).json({ error: "Token invalide" });
        }

        req.userId = decodedToken.id; // Utile dans les contrôleurs
        console.log("ID utilisateur :", decodedToken.id);
        next();
    });
};
