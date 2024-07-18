<template>
  <div>
    <the-header
      :isLoggedIn="isLoggedIn"
      @login-success="updateLoginStatus"
    ></the-header>
    <main>
      <router-view @login-success="updateLoginStatus"></router-view>
    </main>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
  },
  async created() {
    if (this.userId && !this.currentUser) {
      await this.$store.dispatch('users/fetchUserInitialData', {
        uid: this.userId,
      });
      this.isLoggedIn = !!this.currentUser;
    }
  },
  methods: {
    updateLoginStatus(user) {
      this.isLoggedIn = !!user;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f2f2f2;
}
a,
a:visited {
  text-decoration: none;
  color: black;
}
</style>
