<template>
  <li>
    <div class="container">
      <p>{{ text }}</p>
      <p class="time">{{ formatTime(time) }}</p>
      <p class="time"> {{userName}}</p>
    </div>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: ['text', 'time', 'userName'],
  methods: {
    formatTime(time) {
      const momentTime = moment.utc(time).local();
      const now = moment();
      if (momentTime.isSame(now, 'day')) {
        return momentTime.format('HH:mm');
      } else {
        return momentTime.format('YYYY/MM/DD HH:mm');
      }
    },
  },
};
</script>

<style scoped>
.container{
  display: flex;
}
  p {
    font-size: 13px;
  }

  .time{
    font-size: 10px;
    margin: 17px 0 0 10px ;
    color: #626262;
  }

  .dark-mode .time{
      color: rgb(190, 190, 190);

  }
</style>
