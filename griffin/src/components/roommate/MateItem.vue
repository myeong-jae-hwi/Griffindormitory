<template>
  <div class="container" @click="goMateDetail">
    <!-- <p class="description">{{ preferences }}</p> -->
    <h4 class="description">
      {{ sex === 'male' ? '남자' : '여자' }}
      {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
      {{ besmoke === 'notsmoke' ? '비흡연자만' : '흡연-상관없음' }} 룸메이트
      구합니다.
    </h4>
  </div>
</template>

<script>
export default {
  props: ['id', 'count', 'sex', 'location', 'besmoke', 'preferences'],
  methods: {
    goMateDetail() {
      this.$router.push({
        path: `/roommateboard/${this.id}`,
        query: {
          count: encodeURIComponent(this.count),
          sex: this.sex,
          location: this.location,
          besmoke: this.besmoke,
          preferences: this.preferences,
        },
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
  /* border-bottom: 1px solid black; */
}

.description {
  margin: 5px 10px;
}
</style>
