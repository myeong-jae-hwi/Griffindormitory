<template>
  <div>
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';

export default {
  components: {
    TheHeader,
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
