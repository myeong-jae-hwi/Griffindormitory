<template>
  <base-card>
    <div class="image"></div>
    <div class="vertical">
      <h2>{{ users }}</h2>
      <p>2000.12.02</p>
      <p>지능로봇공학과</p>
      <p>1958012</p>
    </div>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { isLoggedIn: false };
  },
  computed: {
    ...mapGetters("users", ["users", "hasUsers"]),
    userId() {
      return this.$store.state.user?.userId || null;
    },
  },
  created() {
    if (this.userId) {
      // userId가 있을 때만 데이터 fetch
      this.$store.dispatch("users/fetchInitialData", {
        uid: this.userId, // userID가 아닌 uid로 변경
      });
    }
  },
  methods: {
    updateLoginStatus(user) {
      this.isLoggedIn = !!user;
    },
  },
};
</script>

<style scoped>
.image {
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-image: url("../../assets/images/BaseProfile.svg");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 3%;
}
.vertical {
  position: relative;
  display: block;
  margin-left: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
}
h2 {
  margin: 0;
}
p {
  margin: 8px;
}
</style>