import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Notification from '../components/Notification/Notification';
import './Notifications.css';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setTimeout(() => {
          setNotifications([
            {
              _id: '1',
              type: 'like',
              sender: { 
                _id: '2', 
                name: 'Jane Doe', 
                profilePic: '' 
              },
              post: { _id: '123' },
              createdAt: new Date(Date.now() - 3600000),
              read: false
            },
            {
              _id: '2',
              type: 'comment',
              sender: { 
                _id: '3', 
                name: 'John Smith', 
                profilePic: '' 
              },
              post: { _id: '456' },
              createdAt: new Date(Date.now() - 86400000),
              read: true
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n._id === id ? { ...n, read: true } : n
    ));

  };

  if (loading) return <div className="loading">Loading notifications...</div>;

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map(notification => (
            <Notification 
              key={notification._id} 
              notification={notification}
              markAsRead={markAsRead}
            />
          ))}
        </div>
      ) : (
        <p>No notifications yet</p>
      )}
    </div>
  );
};

export default Notifications;