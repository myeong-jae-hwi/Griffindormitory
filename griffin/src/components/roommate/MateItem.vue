<template>
  <div class="container" @click="goMateDetail">
    <h4
      class="description"
      :style="{ color: sex === 'male' ? '#4169E1' : '#DB7093' }"
    >
      {{ title }}
    </h4>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'count', 'sex', 'location', 'besmoke', 'preferences'],
  methods: {
    goMateDetail() {
      this.$router.push({
        path: `/roommateboard/${this.id}`,
        query: {
          title: this.title,
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
}

.description {
  margin: 5px 10px;
}
</style>
