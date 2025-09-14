const router = require("express").Router();
const bcrypt = require("bcrypt");
const authController = require("../controllers/authController");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
// const { uploadAvatar } = require("../middleware/multer");
const uploadAvatarMiddleware = require("../middleware/uploadAvatarMiddleware");

// const UserModel = require("../models/user.model");
const { checkUser, requireAuth } = require("../middleware/auth.middleware");

// Auth routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.get("/current-user", checkUser, (req, res) => {
    if (req.userId) return res.status(200).json({ uid: req.userId });
    return res.status(401).json({ message: "Utilisateur non authentifié" });
});

// User CRUD
router.get("/", userController.getAllUsers);
// quand tu soit sur get:id tu aller sur userController et me chercher function userInfo
router.get("/:id", userController.getUserById); // récupère un utilisateur sans mot de passe
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);

// Follow / unfollow
router.post("/:id/follow", requireAuth, userController.follow);
router.delete("/:id/follow", requireAuth, userController.unfollow);

// Upload avatar
router.post(
    "/upload-avatar",
    requireAuth,
    uploadAvatarMiddleware,
    uploadController.uploadAvatar
);

module.exports = router;
