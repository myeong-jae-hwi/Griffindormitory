<template>
  <div>
    <h2 v-if="allNotifications.length === 0" class="no-notifications">
      알람이 없습니다.
    </h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="!loading">
      <li v-for="notification in allNotifications" :key="notification.id">
        <base-card @click="GotoPost(notification)" class="list">
          <p :class="{ isread: notification.is_read }">
            {{ notification.message }}
          </p>
        </base-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseCard from '../../components/UI/BaseCard.vue';

export default {
  components: { BaseCard },
  computed: {
    ...mapGetters('notifications', [
      'allNotifications',
      'notificationsLoading',
      'notificationsError',
    ]),
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
  },
  methods: {
    ...mapActions('notifications', [
      'fetchNotifications',
      'markNotificationAsRead',
      'createNotification',
    ]),
    markAsRead(notificationId) {
      const uid = this.userId;
      this.markNotificationAsRead({ uid, notificationId });
    },
    GotoPost(notificationId) {
      this.markAsRead(notificationId.id);
      this.$router.push({
        path: `/boardlist/${notificationId.boardId}`,
      });
    },
  },
  created() {
    const uid = this.userId;
    console.log(this.notificationId);
    this.fetchNotifications({ uid });
  },
};
</script>

<style scoped>
.no-notifications {
  color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
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
  padding: 0;
}

.list {
  padding-left: 20px;
  cursor: pointer;
}
</style>
