<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <div class="app-btn-container">
      <button @click="toggleDarkMode">
        <div class="sun"></div>
      </button>
    </div>
    <main>
      <router-view @login-success="updateLoginStatus" v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </main>
    <the-footer class="footer"></the-footer>
  </div>
</template>

<script>
import TheFooter from './components/UI/TheFooter.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
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

  // 8.20 민재 - 다크 모드 활성화시 BaseCard background 배경 색상 변경 provide, inject으로 시도했지만 안됨
  provide() {
    return {
      isDarkMode: this.isDarkMode,
    };
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
      console.log('App : ', this.darkMode);
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
body {
  background-color: rgb(239, 238, 244);
  transition: background-color 0.3s ease;
}
div.dark-mode {
  min-height: 100%;
  flex-direction: column;
}
main {
  max-width: 600px;
  /* margin: 0 auto; */
  flex: 1;
  width: 100%;
  flex-direction: column;
  padding-bottom: 100px;
}
button {
  background: #3636367c;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  padding: 0;
}

.dark-mode {
  background-color: rgba(31, 33, 46, 0.829);
  /* background-color: rgb(32,32,32); */
  color: rgb(212, 212, 212)
}
.app-btn-container {
  position: fixed;
  right: 20px;
  bottom: 12%;
  z-index: 1;
}
.sun {
  width: 40px;
  height: 40px;
  opacity: 1;
  background-image: url('assets/images/sun.png');
  background-size: contain;
  background-repeat: no-repeat;
  filter: invert(100%);
}

.app-btn-container button:hover {
  background-color: #555;
  transform: scale(1.05);
}
.app-btn-container button:active {
  background-color: #222;
  transform: scale(0.95);
}
.dark-mode .app-btn-container button {
  background-color: #333;
}
.dark-mode .app-btn-container button:hover {
  background-color: #ddd;
}
.dark-mode .app-btn-container button:active {
  background-color: #bbb;
}

.dark-mode .footer{
  background-color: rgb(32,32,32);
} 

.dark-mode .footer svg{
  color: rgb(221, 221, 221);
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
