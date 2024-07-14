<template>
  <section>
    <base-card>
      <ul>
        <mate-item
          v-for="mate in mates"
          :key="mate.id"
          :id="mate.id"
          :count="mate.count"
          :sex="mate.sex"
          :location="mate.location"
          :etc="mate.etc"
          :preferences="mate.preferences"
        ></mate-item>
      </ul>
    </base-card>
    <router-link to="/roommateboard/register">
      <base-btn>글 쓰기</base-btn>
    </router-link>
    <router-view></router-view>
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
  },
  created() {
    this.$store.dispatch('fetchInitialData');
  },
};
</script>
