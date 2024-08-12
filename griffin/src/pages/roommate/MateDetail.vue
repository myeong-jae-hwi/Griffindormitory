<template>
  <div>
    <div class="card-container">
      <div v-if="currentUser.id === mateUid" class="delete-btn-container">
        <button @click="deleteMate" class="delete-btn">삭제하기</button>
      </div>
      <base-card
        :style="{ backgroundColor: sex === 'male' ? '#4169E1' : '#DB7093' }"
      >
        <div class="card-content">
          <h2>{{ title }}</h2>
          <p>
            성별: <strong>{{ sex === 'male' ? '남자' : '여자' }}</strong>
          </p>
          <p>
            기숙사: <strong>{{ location === 'east' ? '동관' : '서관' }}</strong>
          </p>
          <p>
            모집 인원: <strong>{{ current }}/{{ count }}명</strong>
          </p>
          <p>
            흡연:
            <strong>{{
              besmoke === 'notsmoke' ? '비흡연자만' : '상관없음'
            }}</strong>
          </p>
          <p class="preferences">{{ preferences }}</p>
        </div>
      </base-card>
      <div class="btn-container">
        <base-btn @click="openModal">신청하기</base-btn>
      </div>
    </div>
    <mate-modal v-if="modalOpen" @close="closeModal">
      <template v-slot:header>
        <h3>신청하기</h3>
      </template>
      <template v-slot:body>
        <p>이름 : {{ currentUser.name }}</p>
        <p>학교 : {{ currentUser.university }}</p>
        <p>학번 : {{ currentUser.studentId }}</p>
        <textarea
          rows="2"
          style="width: 100%; resize: none; outline: none; margin: 0 auto"
          placeholder="간단한 자기 소개를 적어주세요."
        ></textarea>
        <div class="btn-container">
          <base-btn @click="submitData">전송하기</base-btn>
        </div>
      </template>
    </mate-modal>
    <mate-modal v-if="submissionSuccess" @close="closeSuccessModal">
      <template v-slot:header>
        <h3>알림</h3>
      </template>
      <template v-slot:body>
        <p>전송되었습니다.</p>
        <div class="btn-container">
          <base-btn @click="closeSuccessModal">닫기</base-btn>
        </div>
      </template>
    </mate-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MateModal from '../../components/roommate/MataModal.vue';

export default {
  components: { MateModal },
  props: [
    "id",
    "title",
    "count",
    "current",
    "sex",
    "location",
    "besmoke",
    "preferences",
    "university",
    "userUid",
  ],
  data() {
    return {
      modalOpen: false,
      postId: this.id,
      submissionSuccess: false,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapGetters({
      mates: 'mates',
      hasMates: 'hasMates',
    }),
    mateUid() {
      return this.$store.state.mates.userUid;
    },
    userId() {
      return this.$store.state.users.userID;
    },
    // userUid() {
    //   return this.$store.state.mates.userUid;
    // },
  },
  created() {
    console.log("Fetching initial data...");
    console.log("Props: ", this.$parent.$options.name);
    this.$store.dispatch("fetchInitialData");
    console.log("제발", this.current);
  },

  methods: {
    submitData() {
      const mate = this.mates.find((mate) => mate.id === this.id);
      const userUid = mate.userUid;
      const userName = this.userName;
      const mateId = this.postId;
      const userId = this.userId;

      this.notice(userUid, userName, mateId, userId);
      this.submissionSuccess = true;
      this.modalOpen = true;
    },
    async deleteMate() {
      const confirmation = window.confirm('게시물을 삭제하시겠습니까 ?');
      if (!confirmation) return;
      try {
        await this.$store.dispatch('deleteMate', this.id);
        alert('게시물을 삭제하셨습니다.');
        this.$router.push('/roommateboard');
      } catch (error) {
        console.error('Error deleting mate:', error.message);
      }
    },
    async notice(to, mateId) {
      try {
        const notification = {
          userId: to,
          message: `새로운 룸메이트 신청이 왔습니다`,
          is_read: false,
          created_at: new Date().toISOString(),
          mateId: mateId,
        };

        await this.$store.dispatch('notifications/createNotification', {
          uid: to,
          notification: notification,
        });
      } catch (error) {
        console.error('Error creating notification:', error.message);
      }
    },
    openModal() {
      if (this.currentUser.gender !== this.sex) {
        alert('성별이 맞지 않아 신청할 수 없습니다.');
        return;
      }

      if (this.currentUser.id === this.mateUid) {
        alert(`${this.currentUser.name}님이 등록한 게시물입니다.`);
        return;
      }
      const mate = this.mates.find((mate) => mate.id === this.id);
      const isSameUniversity = mate.university === this.currentUser.university;
      if (isSameUniversity) this.modalOpen = true;
      else {
        alert('다른 학교 게시물입니다. 신청 자격이 없습니다.');
      }
    },
    closeModal() {
      this.modalOpen = false;
    },
    closeSuccessModal() {
    this.submissionSuccess = false;
    this.modalOpen = false;
  },
  },
};
</script>

<style scoped>
.card-container {
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.card-content {
  padding: 20px;
  font-family: 'Arial, sans-serif';
  color: white;
}

p {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
}

.preferences {
  font-style: italic;
  font-size: 16px;
  color: white;
}

.btn-container {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
}
.delete-btn-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
