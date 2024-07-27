<template>
  <div>
    <the-header
      :isLoggedIn="isLoggedIn"
      @login-success="updateLoginStatus"
    ></the-header>
    <main>
      <router-view @login-success="updateLoginStatus" v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
import TheFooter from './components/UI/TheFooter.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    TheHeader,
    TheFooter,
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

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
