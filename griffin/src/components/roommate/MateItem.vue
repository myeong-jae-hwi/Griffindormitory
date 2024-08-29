<template>
  <div class="container" @click="goMateDetail">
    <h4 class="description">
      {{ title }}
      ({{ current }}/{{ count }})&nbsp;
      <font-awesome-icon
        :icon="sex === 'male' ? 'mars' : 'venus'"
        :style="{ color: sex === 'male' ? 'skyblue' : 'pink' }"
      />
      <!-- {{ sex === 'male' ? '남자' : '여자' }} -->
      <!-- {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
      {{ besmoke === 'notsmoke' ? '비흡연자만' : '흡연-상관없음' }} 룸메이트
      구합니다. -->
    </h4>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "title",
    "count",
    "current",
    "sex",
    "location",
    "besmoke",
    "preferences",
  ],
  methods: {
    goMateDetail() {
      console.log(this.current);
      this.$router.push({
        path: `/roommateboard/${this.id}`,
      });
    },
  },
};
</script>

<style scoped>
.container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.description {
  margin: 5px 10px;
}
</style>
