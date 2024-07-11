<template>
  <div>
    <students-license></students-license>

    <h3>게시판</h3>
    <base-card>
      <div>
        <board-item
          v-for="board in boards"
          :key="board.id"
          :id="board.id"
          :title="board.title"
          :content="board.content"
        ></board-item>
      </div>
      <p>
        <router-link to="/boardlist"> 더보기</router-link>
      </p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StudentsLicense from '../../components/UI/StudentsLicense.vue';
import BoardItem from '../../components/board/BoardItem.vue';

export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
    BoardItem,
  },
  computed: { ...mapGetters('boards', ['boards', 'hasBoards']) },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
  },
};
</script>

<style scoped></style>
