<template>
  <the-header></the-header>
  <div>
    <students-license></students-license>
    <base-btn>Click ME</base-btn>
  </div>
</template>

<script>
import BaseBtn from './components/UI/BaseBtn.vue';
import StudentsLicense from './components/UI/StudentsLicense.vue'
import TheHeader from './components/UI/TheHeader.vue'
export default {
    components: {
      StudentsLicense,
      TheHeader,
        BaseBtn,
    },
};
</script>

<style>
  body {
    margin: 0;
    background-color: #F2F2f2;
  }
  
</style>

