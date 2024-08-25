<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <div class="header">
      <h3>
        <font-awesome-icon icon="chevron-left" @click="goBack" />
      </h3>
      <h3>알림</h3>
      <h3>
        <font-awesome-icon icon="ellipsis-vertical" />
      </h3>
    </div>
    <ul v-if="!loading">
      <h3 v-if="allNotifications.length === 0" class="no-notifications">
      알람이 없습니다.
    </h3>
      <li
        v-for="notification in [...allNotifications].reverse()"
        :key="notification.id"
      >
        <alart-list
          @click="handleNotificationClick(notification)"
          :notification="notification"
          :customClass="
            notification.message === '새로운 룸메이트 신청이 왔습니다'
              ? 'mate'
              : 'list'
          "
        >
          <p :class="{ isread: notification.is_read }">
            {{ notification.message }}
          </p>
        </alart-list>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isMate: false,
    };
  },
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
    goBack() {
      window.history.back();
    },
    markAsRead(notificationId) {
      const uid = this.userId;
      this.markNotificationAsRead({ uid, notificationId });
    },
    handleNotificationClick(notification) {
      this.markAsRead(notification.id);
      const isMateNotification =
        notification.message === "새로운 룸메이트 신청이 왔습니다";
      if (isMateNotification) {
        this.GotoMate(notification);
      } else {
        this.GotoPost(notification);
      }
    },
    GotoPost(notification) {
      this.$router.push({
        path: `/boardlist/${notification.boardId}`,
      });
    },
    GotoMate(notification) {
      console.log(notification.mateId);
      this.$router.push({
        path: `/roommateboard/${notification.mateId}`,
      });
    },
  },
  created() {
    const uid = this.userId;
    this.fetchNotifications({ uid });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
}

li {
  list-style-type: none;
}

li:last-child {
  padding-bottom: 50px;
}

.isread {
  color: #696969;
  font-weight: normal;
}

p {
  font-weight: 700;
}

ul {
  padding: 20px;
}

.list {
  padding-left: 20px;
  cursor: pointer;
}

.mate {
  padding-left: 20px;
  cursor: pointer;
  background-color: #f0f8ff;
}
</style>
