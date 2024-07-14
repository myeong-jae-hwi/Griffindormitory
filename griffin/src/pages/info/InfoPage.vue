<template>
  <div>
    <students-license></students-license>

    <h3>자유 게시판</h3>
    <base-card class="card">
      <ul v-if="hasBoards" class="list">
        <li v-for="board in boards" :key="board.id">
          <board-item
            :id="board.id"
            :title="board.title"
            :content="board.content"
          ></board-item>
        </li>
      </ul>
      <p class="more">
        <router-link to="/boardlist">더보기</router-link>
      </p>
    </base-card>

    <h3>룸메이트 모집 게시판</h3>
    <base-card class="card">
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
      <p class="more">
        <router-link to="/roommateboard">더보기</router-link>
      </p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StudentsLicense from '../../components/UI/StudentsLicense.vue';
import BoardItem from '../../components/board/BoardItem.vue';
import MateItem from '../../components/roommate/MateItem.vue';

export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
    BoardItem,
    MateItem,
  },
  computed: {
    ...mapGetters('boards', ['boards', 'hasBoards']),
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
    this.$store.dispatch('fetchInitialData');
  },
};
</script>

<style scoped>
h3 {
  margin-left: 20px;
}
.card {
  position: relative;
}
.more {
  position: absolute;
  top: 5px;
  right: 20px;
}
</style>
