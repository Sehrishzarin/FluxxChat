const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const { deleteComment } = require("../controllers/postController");
const {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
  deletePost
} = require("../controllers/postController");

router.post("/", auth, upload.single("image"), createPost);
router.get("/", auth, getAllPosts);
router.put("/like/:id", auth, likePost);
router.post("/comment/:id", auth, commentPost);
router.delete("/:id", auth, deletePost);
router.delete("/:postId/comment/:commentId", auth, deleteComment);
module.exports = router;
