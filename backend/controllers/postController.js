import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFullImageUrl = (req, relativePath) => {
  if (!relativePath) return '';
  return `${req.protocol}://${req.get('host')}/${relativePath}`;
};

const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  let imagePath = '';

 if (req.file) {
  imagePath = `/uploads/posts/${req.file.filename}`;
}


  const post = await Post.create({
    user: req.user._id,
    text,
    image: imagePath || undefined,
  });

  if (post) {
    post.image = getFullImageUrl(req, post.image);
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error('Invalid post data');
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name profilePic')
    .populate('comments.user', 'name profilePic');

  const updatedPosts = posts.map(post => {
    return {
      ...post.toObject(),
      image: getFullImageUrl(req, post.image),
      user: {
        ...post.user.toObject(),
        profilePic: getFullImageUrl(req, post.user.profilePic)
      },
      comments: post.comments.map(c => ({
        ...c.toObject(),
        user: {
          ...c.user.toObject(),
          profilePic: getFullImageUrl(req, c.user.profilePic)
        }
      }))
    };
  });

  res.json(updatedPosts);
});

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user', 'name profilePic')
    .populate('comments.user', 'name profilePic');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const alreadyLiked = post.likes.some(
    (like) => like.user.toString() === req.user._id.toString()
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user._id.toString()
    );
  } else {
    post.likes.push({ user: req.user._id });

    if (post.user._id.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: post.user._id,
        sender: req.user._id,
        post: post._id,
        type: 'like',
      });
    }
  }

  await post.save();

  res.json({
    ...post.toObject(),
    image: getFullImageUrl(req, post.image),
    user: {
      ...post.user.toObject(),
      profilePic: getFullImageUrl(req, post.user.profilePic)
    },
    comments: post.comments.map(c => ({
      ...c.toObject(),
      user: {
        ...c.user.toObject(),
        profilePic: getFullImageUrl(req, c.user.profilePic)
      }
    }))
  });
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id)
    .populate('user', 'name profilePic')
    .populate('comments.user', 'name profilePic');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  post.comments.push({ user: req.user._id, text });

  if (post.user._id.toString() !== req.user._id.toString()) {
    await Notification.create({
      recipient: post.user._id,
      sender: req.user._id,
      post: post._id,
      type: 'comment',
    });
  }

  await post.save();

  res.status(201).json({
    ...post.toObject(),
    image: getFullImageUrl(req, post.image),
    user: {
      ...post.user.toObject(),
      profilePic: getFullImageUrl(req, post.user.profilePic)
    },
    comments: post.comments.map(c => ({
      ...c.toObject(),
      user: {
        ...c.user.toObject(),
        profilePic: getFullImageUrl(req, c.user.profilePic)
      }
    }))
  });
});
const deleteComment = asyncHandler(async (req, res) => {
  const { id: postId, commentId } = req.params;
  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  post.comments = post.comments.filter(c => c._id.toString() !== commentId);

  await post.save();
  res.json(post);
});
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }

  await post.remove();
  res.json({ message: 'Post removed' });
});
export { createPost, getPosts, likePost, addComment, deleteComment, deletePost };
