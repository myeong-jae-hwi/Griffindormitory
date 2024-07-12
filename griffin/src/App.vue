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

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      isLoggedIn: false,
    };
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
