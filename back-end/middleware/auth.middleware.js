const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// on va checker le token de l'utilisateur
// module.exports.checkUser = (req, res, next) => {
//     // On récupère le token JWT qui a été stocké dans les cookies au moment du login, Ce token contient l’id utilisateur
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(
//             token,
//             process.env.TOKEN_SECRET,
//             async (err, decodedToken) => {
//                 if (err) {
//                     next();
//                 } else {
//                     let user = await UserModel.findById(decodedToken.id);
//                     res.locals.user = user;
//                     next();
//                 }
//             }
//         );
//     } else {
//         res.locals.user = null;
//         next();
//     }
// }
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    next();
                } else {
                    try {
                        const user = await UserModel.findById(
                            decodedToken.id
                        ).select("-password");
                        res.locals.user = user;
                        next();
                    } catch (error) {
                        console.error(
                            "Erreur lors de la récupération de l'utilisateur :",
                            error
                        );
                        res.locals.user = null;
                        next();
                    }
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
