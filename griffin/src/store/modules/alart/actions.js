const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

import createPersistedState from 'vuex-persistedstate';

export default {
  async fetchNotifications({ commit }, { uid }) {
    try {
      const response = await fetch(`${dbURL}/notifications/${uid}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notificationsData = await response.json();
      const notifications = Object.keys(notificationsData).map((key) => ({
        id: key,
        ...notificationsData[key],
      }));
      commit('setNotifications', notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  },

  async checkUnreadNotifications({ commit }, { uid }) {
    try {
      const response = await fetch(`${dbURL}/notifications/${uid}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notificationsData = await response.json();

      if (notificationsData) {
        const hasUnread = Object.values(notificationsData).some(
          (notification) => !notification.is_read
        );
        commit('setHasUnreadNotifications', hasUnread);
        return hasUnread;
      } else {
        commit('setHasUnreadNotifications', false);
        return false;
      }
    } catch (error) {
      console.error('Error checking unread notifications:', error.message);
      return false;
    }
  },

  async deleteAlert({ commit }, { id, uid }) {
    try {
      const response = await fetch(`${dbURL}/notifications/${uid}/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete alert: ${errorMessage}`);
      }
      commit('deleteAlert', id);
    } catch (error) {
      console.error('Error deleting alert:', error.message);
    }
  },

  async markNotificationAsRead({ commit }, { uid, notificationId }) {
    try {
      const response = await fetch(
        `${dbURL}/notifications/${uid}/${notificationId}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ is_read: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      commit('updateNotificationStatus', { id: notificationId, is_read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  },

  async createNotification({ commit }, { uid, notification }) {
    try {
      const response = await fetch(`${dbURL}/notifications/${uid}.json`, {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create notification');
      }

      const responseData = await response.json();
      commit('addNotification', { id: responseData.name, ...notification });
    } catch (error) {
      console.error('Error creating notification:', error.message);
    }
  },

  async incrementCurrent({ commit }, mateid) {
    try {
      const currentResponse = await fetch(`${dbURL}/roommates/${mateid}/current.json`,);
      const countResponse = await fetch(`${dbURL}/roommates/${mateid}/count.json`,);
      if (!currentResponse.ok) {
        throw new Error('Failed to fetch current value');
      }
      const currentValue = await currentResponse.json();
      const countValue = await countResponse.json();
      let newValue = 0

      console.log(countValue)
      if (countValue > currentValue){
        newValue = currentValue + 1;
      }
      else{
        window.alert('인원이 가득 찼습니다');
      }
      const updateResponse = await fetch(`${dbURL}/roommates/${mateid}/current.json`, {
        method: 'PUT',
        body: JSON.stringify(newValue),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update current value');
      }

      commit('setCurrent', newValue); // Vuex 상태 업데이트
    } catch (error) {
      console.error('Error incrementing current:', error.message);
    }
  },

  clearNotifications({ commit }) {
    commit('resetNotifications');
  },
};

export const plugins = [createPersistedState()];
