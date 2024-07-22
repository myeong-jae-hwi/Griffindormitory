export default {
  allNotifications: (state) => state.notifications,
  unreadNotifications: (state) => state.notifications.filter(notification => !notification.is_read),
};
