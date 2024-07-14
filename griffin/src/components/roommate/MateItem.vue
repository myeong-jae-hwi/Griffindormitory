<template>
  <div class="container">
    <p class="description">{{ count }}명</p>
    <p class="description">{{ sex === 'male' ? '남자' : '여자' }}</p>
    <p class="description">{{ location === 'east' ? '동관' : '서관' }}</p>
    <p class="description">{{ etc === 'smoke' ? '흡연' : '음주' }}</p>
    <p class="description">{{ preferences }}</p>
  </div>
</template>

<script>
export default {
  props: ['id', 'count', 'sex', 'location', 'etc', 'preferences'],
};
</script>

<style scoped>
.container {
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
