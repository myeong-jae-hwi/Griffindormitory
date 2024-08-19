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
import { mapGetters } from 'vuex';

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

  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
    userId() {
      return this.$store.state.users.userID;
    },
    hasMateClass() {
      return this.customClass.includes("mate");
    },

  },
  methods: {
    ...mapActions('notifications', [
      'deleteAlert',
      'incrementCurrent'
    ]),

    async accept() {
      await this.incrementCurrent(this.notification.mateId); 
      console.log(this.notification.mateId);
    },

    async refusal() {
      await this.deleteAlert({ id: this.notification.id, uid: this.$store.state.users.userID });
    }
  },
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
  margin: 20px;
  padding: 5px;
  padding-left: 20px;
  border-radius: 22px;
  box-shadow: 4px 4px 0px 0px #f0f0f0d7;
}

.accept {
  outline: 0;
  background: #5c78e5;
  width: 50px;
  height: 30px;
  border: 0;
  padding: 8px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  border-radius: 8px;
  cursor: pointer;
  margin: 3px;
}

.refusal {
  outline: 0;
  background: #9b9b9b;
  width: 50px;
  height: 30px;
  border: 0;
  padding: 8px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  border-radius: 8px;
  cursor: pointer;
  margin: 3px;
}
</style>
