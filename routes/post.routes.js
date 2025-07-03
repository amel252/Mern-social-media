const router = require("express").Router();
const postController = require("../controllers/post.controller");

// faire 4 function pour le crud

router.get("/", postController.readAllPosts);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
