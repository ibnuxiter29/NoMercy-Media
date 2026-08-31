const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, immutable: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePicture: { type: String, default: null },
  website: { type: String, default: null },
  gender: { type: String, default: null },
  isPrivate: { type: Boolean, default: false },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    username: this.username,
    nickname: this.nickname,
    bio: this.bio,
    profilePicture: this.profilePicture,
    website: this.website,
    gender: this.gender,
    isPrivate: this.isPrivate,
    followersCount: this.followers.length,
    followingCount: this.following.length,
    postsCount: 0, // bisa dihitung terpisah
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);
