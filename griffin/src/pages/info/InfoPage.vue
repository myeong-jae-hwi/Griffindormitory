<template>
  <div class="body">
    <students-license></students-license>

    <div class="slider-container">
      <div class="slider-track">
        <base-card class="slider-item">
          <h3>광고 1</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>광고 2</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>광고 3</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>Content 4</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>Content 5</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>Content 6</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>Content 7</h3>
        </base-card>
        <base-card class="slider-item">
          <h3>Content 8</h3>
        </base-card>
      </div>
    </div>

    <base-card class="card" v-if="currentUser">
      <h3>자유 게시판</h3>

      <p class="more">
        <router-link to="/boardlist">전체 보기</router-link>
      </p>
      <ul v-if="hasBoards && boards.length" class="list">
        <li v-for="board in boards.slice(0, 2)" :key="board.id">
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
            :current="mate.current"
            :sex="mate.sex"
            :location="mate.location"
            :besmoke="mate.besmoke"
            :preferences="mate.preferences"
            :userUid="mate.userUid"
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
import BaseCard from '../../components/UI/BaseCard.vue';

export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
    BoardItem,
    MateItem,
    BaseCard,
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
    console.log('크리에이트 시작')
    this.$store.dispatch('boards/fetchInitialData');
    this.$store.dispatch('fetchInitialData');
  },
  mounted() {
    this.setSliderItemWidth();
    window.addEventListener('resize', this.setSliderItemWidth);
    const track = this.$el.querySelector('.slider-track');
    track.addEventListener('mousedown', this.startDrag);
    track.addEventListener('mouseleave', this.stopDrag);
    track.addEventListener('mouseup', this.stopDrag);
    track.addEventListener('mousemove', this.dragMove);
    console.log('마운트 끝')
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setSliderItemWidth);

    const track = this.$el.querySelector('.slider-track');
    track.removeEventListener('mousedown', this.startDrag);
    track.removeEventListener('mouseleave', this.stopDrag);
    track.removeEventListener('mouseup', this.stopDrag);
    track.removeEventListener('mousemove', this.dragMove);
  },
  methods: {
    slideLeft() {
      const track = this.$el.querySelector('.slider-track');
      track.scrollBy({ left: -200, behavior: 'smooth' });
    },
    slideRight() {
      const track = this.$el.querySelector('.slider-track');
      track.scrollBy({ left: 200, behavior: 'smooth' });
    },
    setSliderItemWidth() {
      const track = this.$el.querySelector('.slider-track');
      const items = track.querySelectorAll('.slider-item');
      const itemWidth = track.clientWidth / items.length;
      items.forEach((item) => {
        item.style.width = `${itemWidth}px`;
      });
    },
    startDrag(event) {
      this.isDragging = true;
      this.startX =
        event.pageX - this.$el.querySelector('.slider-track').offsetLeft;
      this.scrollLeft = this.$el.querySelector('.slider-track').scrollLeft;
    },
    stopDrag() {
      this.isDragging = false;
    },
    dragMove(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      const x =
        event.pageX - this.$el.querySelector('.slider-track').offsetLeft;
      const walk = (x - this.startX) * 2;
      this.$el.querySelector('.slider-track').scrollLeft =
        this.scrollLeft - walk;
    },
  },
};
</script>
<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
  margin: 0px 20px;
  scroll-behavior: smooth;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  justify-content: space-between;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slider-track::-webkit-scrollbar {
  display: none;
}

.slider-item {
  flex-shrink: 0;
  height: 150px;
  min-width: 180px;
  margin: 20px 10px 0px 10px;

  scroll-snap-align: start;
  text-align: center;
}

.slider-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
}

.slider-button.left {
  left: 10px;
}

.slider-button.right {
  right: 10px;
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
  font-size: 16px;
  margin: 20px 0px 0px 20px;
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

.dark-mode a {
  color: #aeaeae;
}
.slider-track a {
  width: 100%;
  height: 10%;
}

p {
  text-align: center;
}

.body {
  padding-bottom: 100px;
}

.dark-mode .card {
  background-color: rgb(52, 52, 62);
}

.dark-mode .slider-item {
  background-color: rgb(52, 52, 62);
}
</style>
