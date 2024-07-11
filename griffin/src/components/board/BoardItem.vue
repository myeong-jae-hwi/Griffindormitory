<template>
  <div class="horizontal">
    <h3 class="description">{{ title }}</h3>
    <p class="description">{{ name }}</p>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'title', 'content'],
};
</script>

<style scoped>
.horizontal {
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.custom-card-content {
  list-style-type: none;
}
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h3 {
  margin: 0;
}

p {
  margin: 0;
}
</style>
