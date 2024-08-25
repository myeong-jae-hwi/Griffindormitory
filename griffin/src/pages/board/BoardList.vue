<template>
  <section class="container">
    <div class="header">
      <h3>
        <font-awesome-icon icon="chevron-left" @click="goBack" />
      </h3>
      <h3>자유 게시판</h3>
      <h3>
        <font-awesome-icon icon="ellipsis-vertical" />
      </h3>
    </div>
    <div v-if="isListRoute" class="checkbox-container">
      <input type="checkbox" id="myUni" v-model="myUniBoards" />
      <label for="myUni">나의 학교 게시물 보기</label>
    </div>
    <base-card
      class="board-list"
      v-if="isListRoute && filteredBoards.length && boards"
    >
      <ul v-if="boards.length" class="list">
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
    <h3 v-if="!boards.length">등록된 게시물이 없습니다.</h3>
    <h3 v-else-if="!filteredBoards.length">
      {{ currentUser.university }} 게시물이 없습니다.
    </h3>
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
  data() {
    return {
      myUniBoards: false,
    };
  },
  computed: {
    ...mapGetters('boards', ['boards', 'hasBoards']),
    ...mapGetters('users', ['currentUser']),
    isListRoute() {
      return this.$route.path === '/boardlist';
    },
    filteredBoards() {
      if (!this.boards) return;
      if (this.myUniBoards) {
        return this.boards.filter(
          (board) => board.university === this.currentUser.university
        );
      }
      return this.boards;
    },
  
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
  },
  methods:{
    goBack() {
      window.history.back();
    },
  }
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-top: 40px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
}
.list {
  padding: 0 20px;
  list-style-type: none;
}
.board-list {
  display: block !important;
}

.dark-mode .board-list{
  background-color: rgb(52, 52, 62)
}

.btn-container {
  display: flex;
  justify-content: center;
  border: none;
}
h3 {
  text-align: center;
  margin: 0;
  padding-top: 10%;
}

section{
  border-bottom: 1px solid #b3b3b33f;
  margin-bottom: 20px;
}

.container{
  border: none;
}

.dark-mode .container{
  border: none;
}

.dark-mode section{
  border-bottom: 1px solid #6262626f;
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
