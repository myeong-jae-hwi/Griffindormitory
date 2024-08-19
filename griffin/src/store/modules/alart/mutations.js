export default {
  setNotifications(state, notifications) {
    state.notifications = notifications;
  },
  updateNotificationStatus(state, { id, is_read }) {
    const notification = state.notifications.find(notification => notification.id === id);
    if (notification) {
      notification.is_read = is_read;
    }
  },
  addNotification(state, notification) {
    state.notifications.push(notification);
  },
  resetNotifications(state) {
    state.notifications = [];
  },
  setHasUnreadNotifications(state, hasUnread) {
    state.hasUnreadNotifications = hasUnread;
  },
  deleteAlert(state, id) {
    state.notifications = state.notifications.filter(notification => notification.id !== id);
  },
  setCurrent(state, newValue) {
    state.current = newValue;
  },
};

