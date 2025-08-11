import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

router
  .route('/')
  .put(protect, upload.single('profilePic'), updateProfile);
router.route('/:userId').get(protect, getUserProfile);

export default router;