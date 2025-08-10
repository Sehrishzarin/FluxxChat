import React, { useState } from "react";
import "./PostCard.css";

const PostCard = ({ post, refresh }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Store when logging in
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: commentText })
    });
    setCommentText("");
    refresh();
  };

  const handleDeletePost = async () => {
    await fetch(`http://localhost:5000/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  const handleDeleteComment = async (commentId) => {
    await fetch(`http://localhost:5000/api/posts/${post._id}/comment/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>{post.user?.username}</strong>
        {post.user?._id === userId && (
          <button className="delete-btn" onClick={handleDeletePost}>
            ❌
          </button>
        )}
      </div>

      <p>{post.text}</p>
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="Post"
          className="post-image"
        />
      )}

      <div className="post-actions">
        <button onClick={handleLike}>
          ❤️ {post.likes.length}
        </button>
      </div>

      <form onSubmit={handleComment} className="comment-form">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Comment</button>
      </form>

      <div className="comments">
        {post.comments.map((c) => (
          <div key={c._id} className="comment">
            <strong>{c.user?.username || "User"}:</strong> {c.text}
            {c.user?._id === userId && (
              <button
                className="delete-comment-btn"
                onClick={() => handleDeleteComment(c._id)}
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
