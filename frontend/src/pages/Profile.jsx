import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProfilePosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const userId = JSON.parse(atob(token.split(".")[1])).id;
    setPosts(data.filter(post => post.user._id === userId));
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  return (
    <div className="profile">
      <h2>My Posts</h2>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} refresh={fetchProfilePosts} />
      ))}
    </div>
  );
};

export default Profile;
