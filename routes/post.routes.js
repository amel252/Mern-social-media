const router = require("express").Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/multer");
const multer = require("multer");

// faire 4 function pour le crud

router.get("/", postController.readAllPosts);
router.post("/",upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// les comments :
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
