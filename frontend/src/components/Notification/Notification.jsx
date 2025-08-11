import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import './Notification.css';

const Notification = ({ notification, markAsRead }) => {
  const { user } = useContext(AuthContext);

  const getNotificationMessage = () => {
    switch (notification.type) {
      case 'like':
        return `${notification.sender.name} liked your post`;
      case 'comment':
        return `${notification.sender.name} commented on your post`;
      default:
        return 'New notification';
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification._id);
    }
  };

  return (
    <Link 
      to={`/post/${notification.post?._id}`} 
      className={`notification ${notification.read ? '' : 'unread'}`}
      onClick={handleClick}
    >
      <img 
        src={notification.sender.profilePic || '/default-profile.png'} 
        alt={notification.sender.name} 
        className="notification-profile-pic"
      />
      <div className="notification-content">
        <p>{getNotificationMessage()}</p>
        <span className="notification-time">
          {formatDistanceToNow(new Date(notification.createdAt))} ago
        </span>
      </div>
    </Link>
  );
};

export default Notification;