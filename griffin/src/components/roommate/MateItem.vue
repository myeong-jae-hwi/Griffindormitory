<template>
  <div class="container" @click="goMateDetail">
    <!-- <p class="description">{{ preferences }}</p> -->
    <h4
      class="description"
      :style="{ color: sex === 'male' ? '#4169E1' : '#DB7093' }"
    >
      {{ title }}
      <!-- {{ sex === 'male' ? '남자' : '여자' }}
      {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
      {{ besmoke === 'notsmoke' ? '비흡연자만' : '흡연-상관없음' }} 룸메이트
      구합니다. -->
      {{current}}/{{count}}
    </h4>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'count', 'current','sex', 'location', 'besmoke', 'preferences'],
  methods: {
    goMateDetail() {
      console.log(this.current)
      this.$router.push({
        path: `/roommateboard/${this.id}`,
        query: {
          title: this.title,
          count: encodeURIComponent(this.count),
          current: encodeURIComponent(this.current),
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
}

.description {
  margin: 5px 10px;
}
</style>
