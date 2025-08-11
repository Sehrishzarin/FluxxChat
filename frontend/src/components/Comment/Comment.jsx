import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { formatDistanceToNow } from 'date-fns';
import './Comment.css';

const Comment = ({ comment, postId }) => {
  const { user } = useContext(AuthContext);
  const { deleteComment } = useContext(PostContext);

  const handleDelete = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(postId, comment._id);
    }
  };

  return (
    <div className="comment">
      <img 
        src={comment.user.profilePic || '/default-profile.png'} 
        alt={comment.user.name} 
        className="comment-profile-pic"
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-username">{comment.user.name}</span>
          <span className="comment-time">
            {formatDistanceToNow(new Date(comment.createdAt))} ago
          </span>
        </div>
        <p>{comment.text}</p>
      </div>
      {(comment.user._id === user?._id || user?.isAdmin) && (
        <button className="comment-delete" onClick={handleDelete}>
          ×
        </button>
      )}
    </div>
  );
};

export default Comment;