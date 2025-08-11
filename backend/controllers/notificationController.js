import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';


const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .sort({ createdAt: -1 })
    .populate('sender', 'name profilePic')
    .populate('post');

  res.json(notifications);
});

const markAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, read: false },
    { $set: { read: true } }
  );

  res.json({ message: 'Notifications marked as read' });
});

export { getNotifications, markAsRead };