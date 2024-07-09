<template>
<<<<<<< Updated upstream
    <div>
        <h2>Hello World</h2>
        <h2>Jaehwi commit</h2>
        <h2>Sungwoo commit</h2>
    </div>
</template>
=======
  <div>
    <the-header></the-header>
    <students-license></students-license>
    <base-btn></base-btn>
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
    background-color: #f2f2f2;
  }
  
</style>
>>>>>>> Stashed changes
