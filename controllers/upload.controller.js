const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        // on fait les condition pour le format de l'img
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "img/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("invalid file");
        // on fait les condition pour la taille de l'img
        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        return res.status(201).json(err);
    }
    const fileName = req.body.name + ".jpg";
};
