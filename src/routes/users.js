const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { checkPrivateAccount } = require('../middleware/privacy');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

// Profile
router.get('/:username', authMiddleware, userController.getUserByUsername);

// Posts milik user (dengan proteksi private account)
router.get('/:username/posts', authMiddleware, checkPrivateAccount, postController.getUserPosts);

// Follow system
router.post('/:username/follow', authMiddleware, userController.follow);
router.delete('/:username/follow', authMiddleware, userController.unfollow);

module.exports = router;
