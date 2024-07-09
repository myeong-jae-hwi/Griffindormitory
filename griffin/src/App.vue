<template>
  <the-header></the-header>
  <main>
    <router-view></router-view>
  </main>
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
  background-color: #f2f2f2;
}
</style>
