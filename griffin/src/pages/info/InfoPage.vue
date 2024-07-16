<template>
  <div>
    <students-license></students-license>

    <base-card class="card">
      <h3>자유 게시판</h3>

      <p class="more">
        <router-link to="/boardlist">더보기</router-link>
      </p>
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

    <base-card class="card">
        <h3>룸메이트 모집 게시판</h3>

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
import { mapGetters } from "vuex";
import StudentsLicense from "../../components/UI/StudentsLicense.vue";
import BoardItem from "../../components/board/BoardItem.vue";
import MateItem from "../../components/roommate/MateItem.vue";

export default {
  name: "InfoPage",
  components: {
    StudentsLicense,
    BoardItem,
    MateItem,
  },
  computed: {
    ...mapGetters("boards", ["boards", "hasBoards"]),
    ...mapGetters({
      mates: "mates",
      hasMates: "hasMates",
    }),

  },
  created() {
    this.$store.dispatch("boards/fetchInitialData");
    this.$store.dispatch("fetchInitialData");
    
  },
  methods: {
    
  }
};
</script>

<style scoped>
h3 {
  margin-left: 20px;
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
  width: 100%;
  border-top: solid 1px #ececec;
  border-bottom: solid 1px #ececec;

}

h3{
  display: block;
}

ul {
  padding: 5px;
}

a {
  color: #6a6a6a;
  font-size: 13px;
}
</style>
