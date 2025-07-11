const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const path = require("path");

module.exports.uploadAvatar = async (req, res) => {
    try {
        // 1. Vérification des erreurs
        if (
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        ) throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");

        // 2. Générer un nom de fichier sûr
        const extension = path.extname(req.file.originalname); // ex: .jpg ou .png
        const fileName = `${req.body.userId}${extension}`;

        const filePath = path.join(__dirname, "../client/public/uploads/profil", fileName);

        // 3. Supprimer l’ancienne image si elle existe
        const user = await UserModel.findById(req.body.userId);
        if (user.picture) {
            const oldPath = path.join(__dirname, "../client/public", user.picture);
            if (fs.existsSync(oldPath)) {
                await fs.promises.unlink(oldPath);
            }
        }

        // 4. Enregistrer la nouvelle image
        await pipeline(req.file.stream, fs.createWriteStream(filePath));

        // 5. Mettre à jour la BDD
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "/uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(200).send(updatedUser);
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(400).json({ errors });
    }
};
