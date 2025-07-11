const UserModel = require("../models/user.model");
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");
const path = require("path");

module.exports.uploadAvatar = async (req, res) => {
    try {
        // 1. Vérification des erreurs
        if (
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/gif" &&
            req.file.mimetype !== "image/jpeg"
        )
            throw Error("invalid file");

        // if (!["image/png", "image/jpeg", "image/jpg"].includes(req.file.mimetype)) {
        // throw Error("invalid file");
        // }


        if (req.file.size > 500000) throw Error("max size");

        // 2. Générer un nom de fichier sûr
          const extension = path.extname(req.file.originalname);
        const newFileName = `${req.body.userId}${extension}`;
        const newPath = path.join(req.file.destination, newFileName);

        // const filePath = path.join(__dirname, "../client/public/uploads/profil", fileName);



        // 3.
        const user = await UserModel.findById(req.body.userId);
            if (user.picture) {
            const oldPath = path.join(__dirname, "../client/public", user.picture);
            if (fs.existsSync(oldPath)) {
            await fs.promises.unlink(oldPath);
            console.log("Ancienne image supprimée :", oldPath);
    }
        }
        // Renommer le fichier temporaire créé par multer
        await fs.promises.rename(req.file.path, newPath);
        console.log("Fichier renommé en :", newFileName);

        // 5. Mettre à jour la BDD
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "/uploads/profil/" + newFileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(200).send(updatedUser);
    } catch (err) {
        console.log("Erreur capturée :", err.message);
        const errors = uploadErrors(err);
        return res.status(400).json({ errors });
    }
};
