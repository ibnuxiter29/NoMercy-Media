const User = require('../models/User');

async function checkPrivateAccount(req, res, next) {
  try {
    const targetUsername = req.params.username;
    const viewerId = req.user.id; // dari authMiddleware

    const targetUser = await User.findOne({ username: targetUsername });
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'NOT_FOUND'
      });
    }

    // Jika akun private dan viewer bukan owner dan bukan follower
    if (targetUser.isPrivate) {
      const isOwner = targetUser._id.toString() === viewerId;
      const isFollower = targetUser.followers.some(id => id.toString() === viewerId);

      if (!isOwner && !isFollower) {
        return res.status(403).json({
          success: false,
          message: 'This account is private',
          error: 'PRIVATE'
        });
      }
    }

    req.targetUser = targetUser;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: 'SERVER' });
  }
}

module.exports = { checkPrivateAccount };
