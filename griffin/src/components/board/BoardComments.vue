<template>
  <li>
    <div>
      <p>{{ text }}, {{ formatTime(time) }}</p>
    </div>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: ['text', 'time'],
  methods: {
    formatTime(time) {
      return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>
