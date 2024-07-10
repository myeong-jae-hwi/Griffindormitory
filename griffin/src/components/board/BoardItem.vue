<template>
  <base-card class="base-list">
    <div class="horizontal">
      <h3 class="description">{{ title }}</h3>
      <p class="description">{{ name }}</p>
      <div class="description">{{ description }}</div>
    </div>
  </base-card>
</template>

<script>
export default {
  props: ["id", "name", "title", "description"],
};
</script>

<style scoped>
.horizontal {
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.base-list {
  height: auto;
  padding: 10px;
  background: transparent;
  border-radius: 0;
  border-top: solid 1px #dedede;
  border-bottom: solid 1px #dedede;
  margin: 2px 20px 2px 20px;
}

.custom-card-content {
  list-style-type: none;
}
.description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h3{
  margin: 0;
}

p{
  margin: 0;
}

</style>