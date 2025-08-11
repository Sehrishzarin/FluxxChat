import express from 'express';
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  deletePost,
  deleteComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

router
  .route('/')
  .post(protect, upload.single('image'), createPost)
  .get(protect, getPosts);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, addComment);
router.route('/:id').delete(protect, deletePost);
router
  .route('/:postId/comments/:commentId')
  .delete(protect, deleteComment);

export default router;