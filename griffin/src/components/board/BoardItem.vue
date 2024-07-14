<template>
  <div class="horizontal">
    <h4 class="description">{{ title }} - {{ content }}</h4>
    <!-- <p class="description">{{ name }}</p> -->
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'title', 'content'],
};
</script>

<style scoped>
.horizontal {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border-bottom: 1px solid black; */
}

.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  margin: 10px 20px;
}
</style>
