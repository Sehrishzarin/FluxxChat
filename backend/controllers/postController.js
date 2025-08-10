const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const newPost = new Post({
      user: req.user.id,
      text,
      image: imagePath
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await post.remove();
    res.json({ message: "Post removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only the comment's author or post owner can delete
    if (comment.user.toString() !== req.user.id && post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    comment.remove();
    await post.save();
    res.json({ message: "Comment removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
