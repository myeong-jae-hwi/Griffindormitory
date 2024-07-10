<template>
  <section>
    <ul v-if="!isRegisterRoute">
      <router-link to="/roommateboard">
        <BaseBtn>룸메이트 글 등록</BaseBtn>
      </router-link>
      <router-link to="/boardlist/register">
        <BaseBtn>자유 게시판 글 등록</BaseBtn>
      </router-link>
    </ul>
    <ul v-if="hasBoards">
      <board-item
        v-for="board in boards"
        :key="board.id"
        :id="board.id"
        :title="board.title"
        :content="board.content"
      ></board-item>
    </ul>
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
    isRegisterRoute() {
      return this.$route.path === '/boardlist/register';
    },
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
  },
};
</script>
