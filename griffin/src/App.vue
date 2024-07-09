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
    margin: 0;
    background-color: #F2F2f2;
  }
  
</style>
