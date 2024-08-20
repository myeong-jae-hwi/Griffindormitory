<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <the-header
      :isLoggedIn="isLoggedIn"
      @login-success="updateLoginStatus"
    ></the-header>

    <div class="app-btn-container">
      <button @click="toggleDarkMode">다크모드</button>
    </div>
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
      darkMode: false,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
    isDarkMode() {
      return this.darkMode;
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
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f2f2f2;
  transition: background-color 0.3s ease;
}
main {
  max-width: 600px;
  height: 1000px;
  margin: 0 auto;
}
.dark-mode {
  background-color: rgba(84, 77, 77, 0.829);
}
.app-btn-container {
  position: absolute;
  right: 0;
  bottom: 10%;
  z-index: 1;
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
