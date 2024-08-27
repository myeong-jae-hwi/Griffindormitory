<template>
  <section class="container">
    <div class="header">
      <h3>
        <font-awesome-icon icon="chevron-left" @click="goBack" />
      </h3>
      <h3>룸메이트 모집 게시판</h3>
      <h3>
        <font-awesome-icon icon="ellipsis-vertical" />
      </h3>
    </div>
    <base-card class='list' v-if="isListRoute && filteredMates.length">
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
  methods:{
    goBack() {
      window.history.back();
    },
  }
};
</script>

<style scoped>
.name {
  text-align: center;
}
.container{
  margin-bottom: 20px;
  /* border-bottom: 1px solid #b3b3b33f; */

}
.btn-container {
  display: flex;
  justify-content: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 30px;
}
.list {
  padding: 0px 10px;
  list-style-type: none;
}

h3 {
  text-align: center;
  margin: 0;
  padding-top: 10%;
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
.dark-mode .list{
  background-color: rgb(52, 52, 62)
}
</style>
