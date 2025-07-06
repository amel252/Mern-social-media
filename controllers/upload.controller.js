const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { pipeline } = require("stream/promises");
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadAvatar = async (req, res) => {
    try {
        // on fait les condition pour le format de l'img
        if (
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpeg"
        )
            throw Error("invalid file");
        if (!req.file.mimetype.startsWith("image/")) {
            // Pour accepter toutes les images de type jpeg, png, etc.
            throw Error("invalid file");
        }
        // on fait les condition pour la taille de l'img
        if (req.file.size > 500000) throw Error("max size");
        // quand il mettra a jour sa photo , on aura pas besoin de la supp , la nouvelle photo vient ecrassé l'ancienne(meme nom)
        // il sert à enregistrer un fichier uploadé
        // On crée le nom de fichier en gardant l'extension d'origine
        const fileName = req.body.name + path.extname(req.file.originalname);

        // On enregistre le fichier dans le dossier uploads/profil
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                path.join(
                    __dirname,
                    "../client/public/uploads/profil",
                    fileName
                )
            )
        );
        // Envoie une réponse succès
        res.status(200).json({
            message: "Photo uploadée avec succès",
            fileName,
        });
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(400).json(errors);
    }
};
