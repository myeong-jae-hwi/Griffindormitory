<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="!loading">
      <li v-for="notification in allNotifications" :key="notification.id">
        <base-card @click="GotoPost(notification)" class="list">
          <p :class="{ isread: notification.is_read }">{{ notification.message }}</p>
        </base-card>
      </li>
    </ul>

    <!-- <button @click="createNewNotification">Create New Notification</button> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseCard from "../../components/UI/BaseCard.vue";

export default {
  components: { BaseCard },
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
    GotoPost(notificationId){
      this.markAsRead(notificationId.id)
      console.log(notificationId.boardId)
      this.$router.push({
        path: `/boardlist/${notificationId.boardId}`,})
    }
    // createNewNotification() {
    //   const uid = this.userId;
    //   const newNotification = {
    //     message: "This is a new notification",
    //     is_read: false,
    //     created_at: new Date().toISOString(),
    //   };
    //   this.createNotification({ uid, notification: newNotification });
    // },
  },
  created() {
    const uid = this.userId;
    this.fetchNotifications({ uid });
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.isread{
  color: #696969;
  font-weight: normal;
}

p{
  font-weight: 700;
}

.list{
  padding-left:20px;
  cursor: pointer;
}
</style>