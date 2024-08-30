<template>
  <div :class="['alart-list', customClass]">
    <slot></slot>
    <div v-if="hasMateClass">
      <button class="accept" @click.stop="accept">수락</button>
      <button class="refusal" @click.stop="refusal">거절</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
    notification: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      hasMateClass: this.customClass.includes("mate"),
    };
  },

  computed: {
    userId() {
      return this.$store.state.users.userID;
    }
  },

  mounted() {
    this.loadNotificationState();
  },

  methods: {
    ...mapActions('notifications', [
      'deleteAlert',
      'incrementCurrent'
    ]),
    ...mapActions('notifications', [
      'hideNotification'
    ]),
    saveNotificationState() {
      const hiddenNotifications = JSON.parse(localStorage.getItem('hiddenNotifications')) || [];
      hiddenNotifications.push(this.notification.id);
      localStorage.setItem('hiddenNotifications', JSON.stringify(hiddenNotifications));
    },

    loadNotificationState() {
      const hiddenNotifications = JSON.parse(localStorage.getItem('hiddenNotifications')) || [];
      if (hiddenNotifications.includes(this.notification.id)) {
        this.hasMateClass = false;
      }
    },

    async accept() {
      await this.incrementCurrent(this.notification.mateId); 
      this.hasMateClass = false;
      this.saveNotificationState();  // 상태 저장
    },

    async refusal() {
      await this.deleteAlert({ id: this.notification.id, uid: this.$store.state.users.userID });
      this.hasMateClass = false;
      this.saveNotificationState();  // 상태 저장
    }
  }
};
</script>

<style scoped>
.alart-list {
  width: auto;
  height: auto;
  background-color: #fcfcfc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  padding: 5px;
  padding-left: 20px;
  border-radius: 22px;
}

.dark-mode .alart-list {
  background-color: #1e1e1e;
}

.accept, .refusal {
  outline: 0;
  width: 50px;
  height: 30px;
  border: 0;
  padding: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  border-radius: 8px;
  cursor: pointer;
  margin: 3px;
}

.accept {
  background: #5c78e5;
}

.refusal {
  background: #9b9b9b;
}
</style>
