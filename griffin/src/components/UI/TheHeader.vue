<template>
  <div>
    <header>
      <div class="left-section">
        <img src="../../assets/images/Logo.png" alt="Logo" class="logo" />
      </div>
      <div class="center-section">
        <h1>Griffin</h1>
      </div>
      <div class="right-section">
        <div id="alarm"></div>
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
            <router-link to="/login" class="nav-link">로그인</router-link>
          </li>
          <li @click="closeMenu">
            <router-link to="/edit" class="nav-link">정보 수정</router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Dovemayo_gothic';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.1/Dovemayo_gothic.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

.header-container {
  position: relative;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8vh;
  background-color: #ffffff;
  margin-bottom: 30px;
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
  font-size: 24px; /* 메뉴 아이콘 크기 조정 */
}

.dropdown-menu {
  position: absolute;
  top: 8vh; /* 헤더 바로 아래에 위치 */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 200px; /* 메뉴의 너비 조정 */
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

.slide-fade-enter-active {
  animation: slide-fade-in 0.5s forwards;
}

.slide-fade-leave-active {
  animation: slide-fade-out 0.5s forwards;
}

@keyframes slide-fade-in {
  0% {
    transform: translateX(100%);
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
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
