<template>
  <section class="container">
    <h1 class="name">룸메이트 모집 게시판</h1>
    <base-card v-if="isListRoute && filteredMates.length">
      <ul v-if="filteredMates.length" class="list">
        <li v-for="mate in filteredMates" :key="mate.id">
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
    </base-card>
    <h3 v-if="!filteredMates.length">등록된 게시물이 없습니다.</h3>
    <div class="btn-container">
      <router-link to="/roommateboard/register">
        <base-btn v-if="isListRoute" class="board-btn">글 쓰기</base-btn>
      </router-link>
    </div>
    <router-view v-slot="slotProps">
      <transition name="mate" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import MateItem from '../../components/roommate/MateItem.vue';

export default {
  components: {
    MateItem,
  },
  computed: {
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
    ...mapGetters('users', ['currentUser']),
    isListRoute() {
      return this.$route.path === '/roommateboard';
    },
    filteredMates() {
      return this.mates.filter(
        (mate) => mate.university === this.currentUser.university
        
      );
    },
  },
  created() {
    this.$store.dispatch('fetchInitialData');
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
h3 {
  text-align: center;
}

.mate-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.mate-enter-active {
  transition: all 0.3s ease-out;
}
.mate-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
