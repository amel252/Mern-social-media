const router = require("express").Router();
const bcrypt = require("bcrypt");
const authController = require("../controllers/authController");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const { uploadAvatar } = require("../middleware/multer");
const multer = require("multer");
const UserModel = require("../models/user.model");

// auth routes
router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// Vérifier si l'utilisateur est déjà connecté
router.get("/current-user", (req, res) => {
    try {
        if (req.session && req.session.userId) {
            return res.status(200).json({ uid: req.session.userId });
        } else {
            return res.status(401).json({ message: "Non authentifié" });
        }
    } catch (err) {
        console.error("Erreur dans /current :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});
// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
// quand tu soit sur get:id tu aller sur userController et me chercher function userInfo
//  **** router.get("/:id", userController.userInfo);
router.get("/:id/info", userController.userInfo);

router.put("/:id/", userController.updateUser);
router.delete("/:id/", userController.deleteUser);
// patch (mettre à jour le tableau )
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

router.post("/upload-Avatar", (req, res) => {
    uploadAvatar.single("file")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 📛 erreur multer (taille)
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    errors: {
                        format: "",
                        maxSize: "Le fichier dépasse 500ko",
                    },
                });
            }
        } else if (err) {
            // 📛 autre erreur (mauvais format, etc.)
            return res.status(400).json({
                errors: {
                    format: err.message,
                    maxSize: "",
                },
            });
        }

        // ✅ Tout est bon, on passe au contrôleur
        uploadController.uploadAvatar(req, res);
    });
});

// router.get("/login", (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ error: "Utilisateur non connecté" });
//     }
//     res.status(200).json({ uid: req.session.userId });
// });
// module.exports = router;
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // 🔐 Enregistrement de l'ID utilisateur dans la session
        req.session.userId = user._id;

        return res.status(200).json({ message: "Connexion réussie" });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
