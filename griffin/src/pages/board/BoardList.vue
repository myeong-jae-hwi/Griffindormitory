<template>
  <section class="container">
    <h1 class="name">자유 게시판</h1>
    <base-card class="board-list" v-if="isListRoute && filteredBoards.length">
      <ul v-if="filteredBoards.length" class="list">
        <li v-for="board in filteredBoards" :key="board.id">
          <board-item
            :id="board.id"
            :title="board.title"
            :content="board.content"
            :time="board.time"
            :author="board.author"
            :userUid="board.userUid"
          ></board-item>
        </li>
      </ul>
    </base-card>
    <h3 v-if="!filteredBoards.length">등록된 게시물이 없습니다.</h3>
    <div class="btn-container">
      <router-link to="/boardlist/register">
        <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
      </router-link>
    </div>
    <router-view v-slot="slotProps">
      <transition name="board" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
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
    ...mapGetters('users', ['currentUser']),
    isListRoute() {
      return this.$route.path === '/boardlist';
    },
    filteredBoards() {
      return this.boards.filter(
        (board) => board.university === this.currentUser.university
      );
    },
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
    console.log("제발",this.boards)
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
.board-list {
  display: block !important;
}
.btn-container {
  display: flex;
  justify-content: center;
}
h3 {
  text-align: center;
}

.board-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.board-enter-active {
  transition: all 0.3s ease-out;
}
.board-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
