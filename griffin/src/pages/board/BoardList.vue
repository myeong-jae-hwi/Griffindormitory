<template>
  <section class="container">
    <h1 class="name">자유 게시판</h1>
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
      <h3 v-if="!hasBoards">작성된 게시물이 없습니다.</h3>
    </base-card>
    <div class="btn-container">
      <router-link to="/boardlist/register">
        <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
      </router-link>
    </div>
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
