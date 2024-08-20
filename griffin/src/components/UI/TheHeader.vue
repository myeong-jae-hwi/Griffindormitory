<!--

2024. 07. 22) 새로고침해야 알림 뜨는 이슈 있음 

-->

<template>
  <header class="header">
    <div class="left-section">
      <router-link to="/info">
        <img src="../../assets/images/Logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    <div class="center-section">
      <router-link to="/info">
        <h1>Griffin</h1>
      </router-link>
    </div>
    <div class="right-section">
      <div class="alarm-section">
        <router-link to="/alart">
          <div id="alarm">
            <div id="notification">
              <span v-if="notice" class="note-num"></span>
            </div>
          </div>
        </router-link>
      </div>
      <div id="menu" @click="toggleMenu">
        <span v-if="!menuOpen">☰</span>
        <span v-else>X</span>
      </div>
    </div>
  </header>
  <transition name="slide-fade">
    <div class="dropdown-menu" v-if="menuOpen">
      <ul>
        <li @click="closeMenu">
          <router-link to="/userinfo" class="nav-link">정보 수정</router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/score" class="nav-link">학적 관리</router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/timetable" class="nav-link">시간표</router-link>
        </li>
        <li @click="closeMenu">
          <router-link
            v-if="isLoggedIn"
            @click="handleAuthAction"
            to="/"
            class="nav-link"
            >로그아웃</router-link
          >
          <router-link
            v-else
            @click="handleAuthAction"
            to="/login"
            class="nav-link"
            >로그인</router-link
          >
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { auth } from '@/firebase/config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      menuOpen: false,
      notice: false,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapState(['notifications', ['hasUnreadNotifications']]),
    userUid() {
      return this.$store.state.users.users[0]?.id;
    },
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      this.$emit('login-success', user);
      if (user) {
        this.checkNotifications();
      }
    });
  },
  watch: {
    hasUnreadNotifications(newValue) {
      this.notice = newValue;
    },
  },
  methods: {
    ...mapActions('notifications', ['checkUnreadNotifications']),
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    handleAuthAction() {
      if (this.isLoggedIn) {
        signOut(auth)
          .then(() => {
            this.$store.dispatch('users/logout');
            this.$router.push('/login');
            this.$emit('login-success', null);
            if (self.name != 'reload') {
              self.name = 'reload';
              self.location.reload(true);
            } else self.name = '';
          })
          .catch((error) => {
            console.error('로그아웃 오류: ', error);
          });
      } else {
        this.$router.push('/login');
      }
      this.closeMenu();
    },
    async checkNotifications() {
      const hasUnread = await this.checkUnreadNotifications({
        uid: this.userUid,
      });
      this.notice = hasUnread;
    },
  },
};
</script>

<style scoped>
html {
  height: 100%;
}

.header-container {
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8vh;
  background-color: #ffffff;
  /* margin-bottom: 30px; */
  box-shadow: 0px 4px 0px 0px #f0f0f0d7;
  position: relative;
  z-index: 1;
}

.left-section {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.logo {
  height: 40px;
}

.center-section {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-section h1 {
  font-size: 1.5em;
  font-family: 'Dovemayo_gothic';
}

.right-section {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

#alarm {
  width: 20px;
  height: 20px;
  background-image: url('../../assets/images/bell.png');
  background-size: cover;
  margin-right: 10px;
}

#menu {
  width: 20px;
  height: 20px;
  background-size: cover;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.dropdown-menu {
  position: absolute;
  top: 8vh;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 200px;
  text-align: center;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.slide-fade-enter-active {
  animation-name: slide-fade-in;
}

.slide-fade-leave-active {
  animation-name: slide-fade-out;
}
/* 여기 수정
  X만큼 width가 변경되어 footer에 영향을 미침.
   */
@keyframes slide-fade-in {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-fade-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50px);
    opacity: 0;
  }
}

.note-num {
  position: absolute;
  margin-left: 17px;
  z-index: 3;
  height: 8px;
  width: 8px;
  background-color: rgb(255, 33, 33);
  border-radius: 15px;
  display: inline-block;
}
</style>
