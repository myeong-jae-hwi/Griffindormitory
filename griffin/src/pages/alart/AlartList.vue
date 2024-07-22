<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="!loading">
      <li v-for="notification in allNotifications" :key="notification.id">
        <p>{{ notification.message }}</p>
        <button
          v-if="!notification.is_read"
          @click="markAsRead(notification.id)"
        >
          Mark as Read
        </button>
      </li>
    </ul>
    <button @click="createNewNotification">Create New Notification</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("notifications", [
      "allNotifications",
      "notificationsLoading",
      "notificationsError",
    ]),
    ...mapGetters("users", ["currentUser"]),
    userId() {
      return this.$store.state.users.userID;
    },
  },
  methods: {
    ...mapActions("notifications", [
      "fetchNotifications",
      "markNotificationAsRead",
      "createNotification",
    ]),
    markAsRead(notificationId) {
      const uid = this.userId;
      this.markNotificationAsRead({ uid, notificationId });
    },
    createNewNotification() {
      const uid = this.userId;
      const newNotification = {
        message: "This is a new notification",
        is_read: false,
        created_at: new Date().toISOString(),
      };
      this.createNotification({ uid, notification: newNotification });
    },
  },
  created() {
    const uid = this.userId;
    this.fetchNotifications({ uid });
  },
};
</script>
