<template>
  <div class="container">
    <!-- <p class="description">{{ preferences }}</p> -->
    <h4 class="description">
      {{ sex === 'male' ? '남자' : '여자' }}
      {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
      {{ besmoke === 'smoke' ? '비흡연자만' : '흡연-상관없음' }} 룸메이트
      구합니다.
    </h4>
  </div>
</template>

<script>
export default {
  props: ['id', 'count', 'sex', 'location', 'besmoke', 'preferences'],
};
</script>

<style scoped>
.container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border-bottom: 1px solid black; */
}

.description {
  margin: 10px 20px;
}
</style>
