<template>
  <section class="container">
    <base-card v-if="isListRoute">
      <ul class="list">
        <li v-for="mate in mates" :key="mate.id">
          <mate-item
            :id="mate.id"
            :count="mate.count"
            :sex="mate.sex"
            :location="mate.location"
            :etc="mate.etc"
            :preferences="mate.preferences"
          ></mate-item>
        </li>
      </ul>
    </base-card>
    <router-link to="/roommateboard/register">
      <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
    </router-link>
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
.list {
  padding: 0 20px;
  list-style-type: disc;
}

.board-btn {
  position: absolute;
  display: flex;
  justify-content: center;
}
</style>
