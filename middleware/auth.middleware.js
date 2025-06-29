const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// on va checker le token de l'utilisateur
module.exports.checkUser = (req, res, next) => {
    // On récupère le token JWT qui a été stocké dans les cookies au moment du login, Ce token contient l’id utilisateur
    const token = req.cookies.jwt;
    if (token) {
        jtw.verify(
            // Cette méthode vérifie si le token est valide
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    // si erreur on suppr le cookie, On met res.locals.user = null pour dire qu’aucun utilisateur n'est connecté.
                    res.locals.user = null;
                    res.cookie("jwt", "", { maxAge: 1 });
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id);
                    // si pas d'erreur On utilise decodedToken.id pour chercher l’utilisateur dans MongoDB
                    res.locals.user = user;
                    // On stocke cet utilisateur dans res.locals.user → cela permet à toutes les vues ou middlewares suivants d’y accéder.
                    next();
                }
            }
        );
    } else {
        res.locals.user = null;
        next();
    }
};
// on a besoin de middleware quand on se connecte pour la 1ere fois est déja dans la BDclea
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log("Token invalide :", err.message);
                return res.status(401).json({ error: "Token invalide" });
            } else {
                console.log("ID utilisateur :", decodedToken.id);
                next();
            }
        });
    } else {
        console.log("Aucun token fourni");
        return res.status(401).json({ error: "Accès refusé : pas de token" });
    }
};
