<template>
  <section class="board-list" @click="goToDetail">
    <h4 class="title">{{ title }}</h4>
    <p class="description">{{ content }}</p>
    <p class="description nondisplay">{{ formatTime(time) }}</p>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  props: ['id', 'name', 'title', 'content', 'time'],
  methods: {
    formatTime(time) {
      return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
    },
    goToDetail() {
      this.$router.push({
        path: `/boardlist/${this.id}`,
        query: {
          title: encodeURIComponent(this.title),
          content: encodeURIComponent(this.content),
          time: encodeURIComponent(this.time),
        },
      });
    },
  },
};
</script>

<style scoped>
.board-list {
  width: 100%;
  cursor: pointer;
}
.title {
  margin: 10px;
}
.description {
  margin: 5px 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
.nondisplay {
  display: none;
}
</style>
