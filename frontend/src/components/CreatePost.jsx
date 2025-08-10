import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      setText("");
      setImage(null);
      onPostCreated();
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <textarea
        placeholder="Share something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
