<template>
  <section class="container">
    <h1 class="name">룸메이트 모집 게시판</h1>
    <base-card v-if="isListRoute">
      <ul v-if="hasMates" class="list">
        <li v-for="mate in mates" :key="mate.id">
          <mate-item
            :id="mate.id"
            :count="mate.count"
            :sex="mate.sex"
            :location="mate.location"
            :besmoke="mate.besmoke"
            :preferences="mate.preferences"
          ></mate-item>
        </li>
      </ul>
      <h3 v-if="!hasMates">작성된 게시물이 없습니다.</h3>
    </base-card>
    <div class="btn-container">
      <router-link to="/roommateboard/register">
        <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
      </router-link>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import MateItem from '../../components/roommate/MateItem.vue';

export default {
  components: {
    MateItem,
  },
  computed: {
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
    isListRoute() {
      return this.$route.path === '/roommateboard';
    },
  },
  created() {
    this.$store.dispatch('fetchInitialData');
  },
};
</script>

<style scoped>
.name {
  text-align: center;
}
.list {
  padding: 0 20px;
  list-style-type: disc;
}
.btn-container {
  display: flex;
  justify-content: center;
}
</style>
