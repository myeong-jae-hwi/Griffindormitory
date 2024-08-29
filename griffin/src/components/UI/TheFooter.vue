<!--
07/27 민재
 - 각 router-link icon 추가 예정
 - 홈, 시간표, 설정, 알람 ? 조금 더 고민해보자
 - TheHeader의 dropdown-menu animation이 활성화 되면 footer가 밀리는 상황 발생

 08/04 재휘
 - 푸터에 요소가 자꾸 겹쳐서 그냥 마진 줘버릴게용~ ^@^
-->

<template>
  <footer class="footer" v-if="!$route.meta.hideFooter">
    <div class="footer-content">
      <nav>
        <router-link to="/info" class="footer-link">
          <font-awesome-icon :icon="['fas', 'home']" class="fa-lg" />
        </router-link>
        <router-link to="/timetable" class="footer-link">
          <font-awesome-icon :icon="['fas', 'calendar-alt']" class="fa-lg" />
        </router-link>
        <router-link to="/setting" class="footer-link">
          <font-awesome-icon :icon="['fas', 'cogs']" class="fa-lg" />
        </router-link>
        <router-link to="/alart" class="footer-link">
          <div class="notification-wrapper">
            <span v-if="notice" class="note-num"></span>
            <font-awesome-icon :icon="['fas', 'bell']" class="fa-lg" />
          </div>
        </router-link>
      </nav>
    </div>
  </footer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { auth } from '@/firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  data() {
    return {
      notice: false,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapState(['notifications', ['hasUnreadNotifications']]),
    userUid() {
      return this.$store.state.users.users[0]?.id;
    },
  },
  watch: {
    hasUnreadNotifications(newValue) {
      this.notice = newValue;
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkNotifications();
      }
    });
  },
  methods: {
    ...mapActions('notifications', ['checkUnreadNotifications']),
    async checkNotifications() {
      const hasUnread = await this.checkUnreadNotifications({
        uid: this.userUid,
      });
      this.notice = hasUnread;
    },
  }
};
</script>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 15px 15px 50px 15px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

.footer-content {
  display: flex;
  justify-content: center;
}

nav {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.footer-link {
  margin: 0 10px;
  font-size: 0.9em;
  text-decoration: none;
  flex: 1;
  text-align: center;
}

.footer-link .fa-icon {
  margin-right: 5px;
}

.notification-wrapper {
  position: relative;
  display: inline-block;
}

.note-num {
  position: absolute;
  top: -5px;
  right: -5px;
  height: 8px;
  width: 8px;
  background-color: rgb(255, 33, 33);
  border-radius: 50%;
  display: inline-block;
}
</style>