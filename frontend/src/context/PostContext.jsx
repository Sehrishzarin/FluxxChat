import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', {
        withCredentials: true
      });
      setPosts(res.data);
    } catch (err) {
      toast.error('Failed to fetch posts');
    }
  };

  // Create a post
  const createPost = async (text, image) => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (image) formData.append('image', image);

      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setPosts([res.data, ...posts]);
      toast.success('Post created!');
    } catch (err) {
      toast.error('Failed to create post');
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );
      setPosts(posts.map(post =>
        post._id === postId ? res.data : post
      ));
    } catch (err) {
      toast.error('Failed to like post');
    }
  };

  // Add a comment
  const addComment = async (postId, text) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text },
        { withCredentials: true }
      );
      setPosts(posts.map(post =>
        post._id === postId ? res.data : post
      ));
      toast.success('Comment added!');
    } catch (err) {
      toast.error('Failed to add comment');
    }
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts, createPost, likePost, addComment }}>
      {children}
    </PostContext.Provider>
  );
};
