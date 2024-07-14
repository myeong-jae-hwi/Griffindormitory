<template>
  <section class="container">
    <base-card v-if="isListRoute">
      <ul v-if="hasBoards" class="list">
        <li v-for="board in boards" :key="board.id">
          <board-item
            :id="board.id"
            :title="board.title"
            :content="board.content"
          ></board-item>
        </li>
      </ul>
    </base-card>
    <router-link to="/boardlist/register">
      <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
    </router-link>
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import BoardItem from '../../components/board/BoardItem.vue';

export default {
  components: {
    BoardItem,
  },

  computed: {
    ...mapGetters('boards', ['boards', 'hasBoards']),
    isListRoute() {
      return this.$route.path === '/boardlist';
    },
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
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
