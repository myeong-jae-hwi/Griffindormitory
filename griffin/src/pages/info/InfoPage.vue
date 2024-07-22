<template>
  <div>
    <students-license></students-license>

    <base-card class="card" v-if="currentUser">
      <h3>자유 게시판</h3>

      <p class="more">
        <router-link to="/boardlist">나의 학교 게시물 보기</router-link>
      </p>
      <ul v-if="hasBoards && boards.length" class="list">
        <li v-for="board in boards.slice(0, 2)" :key="board.id">
          <board-item
            :id="board.id"
            :title="board.title"
            :content="board.content"
            :time="board.time"
            :author="board.author"
          ></board-item>
        </li>
      </ul>
      <p v-else>등록된 게시물이 없습니다.</p>
    </base-card>

    <base-card class="card" v-if="currentUser">
      <h3>룸메이트 모집 게시판</h3>

      <ul v-if="hasMates && mates.length" class="list">
        <li v-for="mate in mates.slice(0, 3)" :key="mate.id">
          <mate-item
            :id="mate.id"
            :title="mate.title"
            :count="mate.count"
            :sex="mate.sex"
            :location="mate.location"
            :besmoke="mate.besmoke"
            :preferences="mate.preferences"
          ></mate-item>
        </li>
      </ul>
      <p v-else>등록된 게시물이 없습니다.</p>
      <p class="more">
        <router-link to="/roommateboard">나의 학교 게시물 보기</router-link>
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
    ...mapGetters('users', ['currentUser']),
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
  },
  created() {
    this.$store.dispatch('boards/fetchInitialData');
    this.$store.dispatch('fetchInitialData');
  },
  methods: {},
};
</script>

<style scoped>
h3 {
  font-size: 16px;
  margin: 20px 0px 0px 20px;
}
.card {
  position: relative;
  display: block !important;
}
.more {
  position: absolute;
  top: 5px;
  right: 20px;
}

.list {
  list-style: none;
}

li {
  width: 98%;
  margin-bottom: 20px;
  font-size: 14px;
}

h3 {
  display: block;
}

ul {
  padding: 10px;
  margin: 0px;
}

a {
  color: #6a6a6a;
  font-size: 13px;
}

p {
  text-align: center;
}
</style>
