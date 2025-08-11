import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import Post from '../components/Post/Post';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const { posts, fetchPosts } = useContext(PostContext);
  const [profileUser, setProfileUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      // In a real app, you'd fetch the user profile from API
      const userToShow = userId || currentUser?._id;
      if (userToShow) {
        // Simulate fetching user data
        setProfileUser({
          ...currentUser,
          bio: currentUser.bio || 'No bio yet'
        });
        fetchPosts();
      }
    };
    loadProfile();
  }, [userId, currentUser]);

  const handleSave = () => {
    // In a real app, you'd call an API to update the profile
    setProfileUser({ ...profileUser, bio });
    setIsEditing(false);
  };

  if (!profileUser) return <div>Loading...</div>;

  const userPosts = posts.filter(post => post.user._id === profileUser._id);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img src={`http://localhost:5000${profileUser.profilePic}`} alt="Profile" />
          <h2>{profileUser.name}</h2>
          
          {isEditing ? (
            <div className="bio-edit">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
              <div className="edit-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="bio">
              <p>{profileUser.bio}</p>
              {(!userId || userId === currentUser?._id) && (
                <button 
                  className="edit-btn"
                  onClick={() => {
                    setBio(profileUser.bio);
                    setIsEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;