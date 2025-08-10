import { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login.");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="feed">
      <h2>FluxxTalk Feed</h2>
      <CreatePost onPostCreated={fetchPosts} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} refresh={fetchPosts} />
      ))}
    </div>
  );
};

export default Feed;
