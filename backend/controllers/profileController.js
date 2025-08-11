import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';

const getFullImageUrl = (req, relativePath) => {
  if (!relativePath) return '';
  return `${req.protocol}://${req.get('host')}/${relativePath}`;
};

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password');
  const posts = await Post.find({ user: req.params.userId })
    .sort({ createdAt: -1 })
    .populate('user', 'name profilePic');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const updatedPosts = posts.map(post => ({
    ...post.toObject(),
    image: getFullImageUrl(req, post.image),
    user: {
      ...post.user.toObject(),
      profilePic: getFullImageUrl(req, post.user.profilePic)
    }
  }));

  res.json({
    user: {
      ...user.toObject(),
      profilePic: getFullImageUrl(req, user.profilePic)
    },
    posts: updatedPosts
  });
});
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { name, bio } = req.body;

  if (name) user.name = name;
  if (bio) user.bio = bio;

if (req.file) {
  user.profilePic = `/uploads/profiles/${req.file.filename}`;
}

const updatedUser = await user.save();

res.json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  profilePic: getFullImageUrl(req, updatedUser.profilePic),
  bio: updatedUser.bio,
});
});


export { getUserProfile, updateProfile };
