const multer = require("multer");
const path = require("path");

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profil"); // dossier où seront stockées les images
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // .jpg, .png, etc.
        const name = file.originalname.split(".")[0]; // sans extension
        cb(null, Date.now() + "-" + name + ext);
    },
});

// === Storage pour les posts ===
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/posts"); // dossier où seront stockées les images
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = file.originalname.split(".")[0];
        cb(null, `${Date.now()}-${name}${ext}`);
    },
});
// Filtre pour autoriser uniquement certains types de fichiers , Filtre commun ===
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isExtValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const isMimeValid = allowedTypes.test(file.mimetype);

    if (isExtValid && isMimeValid) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Seules les images (jpg, jpeg, png, gif) sont autorisées !"
            )
        );
    }
};

// === Exporter deux middlewares distincts ===
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
});

const uploadPost = multer({
    storage: postStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
});

module.exports = {
    uploadAvatar,
    uploadPost,
};
