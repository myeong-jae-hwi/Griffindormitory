<template>
  <div>
    <base-card
      :style="{ backgroundColor: sex === 'male' ? 'skyblue' : 'pink' }"
    >
      <h3 class="description">
        {{ sex === 'male' ? '남자' : '여자' }}
        {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
        {{ besmoke === 'notsmoke' ? '비흡연자만' : '흡연-상관없음' }}
        룸메이트 구합니다.
      </h3>
      <p>{{ preferences }}</p>
    </base-card>
    <div class="btn-container">
      <base-btn>신청하기</base-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'count', 'sex', 'location', 'besmoke', 'preferences'],
};
</script>

<style scoped>
h3 {
  margin: 10px;
  margin-bottom: 0;
}
p {
  margin: 10px;
  font-size: 16px;
  line-height: 1.5;
}
.btn-container {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
}
</style>
