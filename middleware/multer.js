const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/uploads/profil"); // dossier où les fichiers seront enregistrés
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // .jpg, .png, etc.
        const name = file.originalname.split(".")[0]; // sans extension
        cb(null, Date.now() + "-" + name + ext);
    },
});

// Filtre pour autoriser uniquement certains types de fichiers
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

// Middleware multer final
// Middleware multer final
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 500000 }, // ⚠️ 500ko max
});


module.exports = upload;
