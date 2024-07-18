<template>
  <base-card>
    <div class="image"></div>
    <div class="vertical" v-if="currentUser">
      <h2>{{ currentUser.name }}</h2>
      <p>{{ currentUser.email }}</p>
      <p>{{ currentUser.university }}</p>
      <p>{{ currentUser.studentId }}</p>
      <p>{{ currentUser.semester.join(', ') }}</p>
    </div>
    <div v-else>회원 정보가 없습니다.</div>
  </base-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
  },
  mounted() {
    if (this.userId && !this.currentUser) {
      this.$store.dispatch('users/fetchUserInitialData', {
        uid: this.userId,
      });
    }
  },
};
</script>

<style scoped>
.image {
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-image: url('../../assets/images/BaseProfile.svg');
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
