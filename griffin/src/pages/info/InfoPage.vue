<!-- InfoPage.vue -->
<template>
  <div>
    <students-license></students-license>
  </div>
</template>

<script>
import StudentsLicense from '../../components/UI/StudentsLicense.vue';

export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
  },
};
</script>
