<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <!-- <the-header
      :isLoggedIn="isLoggedIn"
      @login-success="updateLoginStatus"
    ></the-header> -->

    <div class="app-btn-container">
      <button @click="toggleDarkMode">
        <div class='sun'> </div>
      </button>
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
body {
  margin: 0;
  background-color: rgb(239, 238, 244);
  transition: background-color 0.3s ease;
}

button{
  background: #3636367c;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  padding: 0;
}

main {
  max-width: 600px;
  height: 700px;
  margin: 0 auto;
}
.dark-mode {
  background-color: rgba(84, 77, 77, 0.829);
}
.app-btn-container {
  position: fixed;
  right: 20px;
  bottom: 12%;
  z-index: 1;
}
.app-btn-container button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
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
  background-color: #fff;
  color: #333;
}
.dark-mode .app-btn-container button:hover {
  background-color: #ddd;
}
.dark-mode .app-btn-container button:active {
  background-color: #bbb;
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

.sun{
  width: 40px;
  height: 40px;
  opacity: 1;
  background-image: url('assets/images/sun.png');
  background-size: contain;
  background-repeat: no-repeat;
  filter: invert(100%);
}
</style>
