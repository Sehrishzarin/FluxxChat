const express = require('express');
const { register, login } = require('../controllers/authController');
const protect = require("../middleware/authMiddleware"); 
const upload = require("../middleware/uploadMiddleware"); 
const router = express.Router();
const { createPost } = require('../controllers/postController');

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post("/posts", protect, upload.single("image"), createPost);

module.exports = router;