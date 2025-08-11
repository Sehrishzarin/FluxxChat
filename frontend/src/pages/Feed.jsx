import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import Post from '../components/Post/Post';
import './Feed.css';
import Navbar from '../components/Navbar/Navbar';

const Feed = () => {
  const { posts, fetchPosts, createPost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    fetchPosts(); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() || postImage) {
      createPost(postText, postImage);
      setPostText('');
      setPostImage(null);
    }
  };

  return (<>
  <Navbar/>
    <div className="feed-container">
      <div className="feed-content">
        {/* Create Post Box */}
        {user && (
          <div className="create-post">
            <form onSubmit={handleSubmit}>
              <div className="post-input">
                <img 
                  src={user.profilePic || '/default-profile.png'} 
                  alt="You" 
                  className="post-user-avatar"
                />
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </div>
              <div className="post-actions">
                <label className="file-upload">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setPostImage(e.target.files[0])}
                  />
                  <span>Photo</span>
                </label>
                <button type="submit" disabled={!postText.trim() && !postImage}>
                  Post
                </button>
              </div>
              {postImage && (
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(postImage)} 
                    alt="Preview" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setPostImage(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </div></>
  );
};

export default Feed;
