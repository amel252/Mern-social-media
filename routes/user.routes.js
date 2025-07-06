const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
// quand tu soit sur get:id tu aller sur userController et me chercher function userInfo
router.get("/:id", userController.userInfo);
router.put("/:id/", userController.updateUser);
router.delete("/:id/", userController.deleteUser);
// patch (mettre à jour le tableau )
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
