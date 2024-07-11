<template>
  <section class="container">
    <base-card v-if="isListRoute">
      <ul v-if="hasBoards">
        <board-item
          v-for="board in boards"
          :key="board.id"
          :id="board.id"
          :title="board.title"
          :content="board.content"
        ></board-item>
      </ul>
    </base-card>
    <router-link to="/boardlist/register">
      <BaseBtn v-if="isListRoute" class="board-btn">글 쓰기</BaseBtn>
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
.board-btn {
  position: absolute;
  display: flex;
  justify-content: center;
}
</style>
