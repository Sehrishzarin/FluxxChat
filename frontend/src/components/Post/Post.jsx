import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegHeart, FaComment, FaEllipsisH } from 'react-icons/fa';
import Comment from '../Comment/Comment';
import './Post.css';

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { likePost, addComment } = useContext(PostContext);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.likes.some(like => like.user === user?._id);

  const handleLike = () => {
    likePost(post._id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post._id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img 
          src={post.user.profilePic || '/default-profile.png'} 
          alt={post.user.name} 
          className="post-profile-pic"
        />
        <div className="post-user-info">
          <h4>{post.user.name}</h4>
          <span className="post-time">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </span>
        </div>
        {post.user._id === user?._id && (
          <button className="post-options">
            <FaEllipsisH />
          </button>
        )}
      </div>

      <div className="post-content">
        <p>{post.text}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{post.likes.length}</span>
        </button>
        <button 
          className="comment-btn" 
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          <div className="add-comment">
            <img 
              src={user?.profilePic || '/default-profile.png'} 
              alt="You" 
              className="comment-profile-pic"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
          </div>
          
          {post.comments.map(comment => (
            <Comment key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;