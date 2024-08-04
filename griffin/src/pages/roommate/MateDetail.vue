<template>
  <div>
    <div class="card-container">
      <base-card
        :style="{ backgroundColor: sex === 'male' ? '#4169E1' : '#DB7093' }"
      >
        <div class="card-content">
          <h2>{{ title }}</h2>
          <p>
            성별: <strong>{{ sex === "male" ? "남자" : "여자" }}</strong>
          </p>
          <p>
            기숙사: <strong>{{ location === "east" ? "동관" : "서관" }}</strong>
          </p>
          <p>
            모집 인원: <strong>{{ count }}/4명</strong>
          </p>
          <p>
            흡연:
            <strong>{{
              besmoke === "notsmoke" ? "비흡연자만" : "상관없음"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MateModal from "../../components/roommate/MataModal.vue";

export default {
  components: { MateModal },
  props: [
    "id",
    "title",
    "count",
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
    };
  },
  computed: {
    ...mapGetters("users", ["currentUser"]),
    ...mapGetters({
      mates: "mates",
      hasMates: "hasMates",
    }),

    userId() {
      return this.$store.state.users.userID;
    },
    // userUid() {
    //   return this.$store.state.mates.userUid;
    // },
  },
  created() {
    console.log("Fetching initial data...");
    this.$store.dispatch("fetchInitialData");
    console.log("제발", this.postId);
  },

  methods: {
    submitData() {
      const mate = this.mates.find((mate) => mate.id === this.id);
      const userUid = mate.userUid;
      const userName = this.userName;
      const mateId = this.postId;
      const userId = this.userId;

      this.notice(userUid, userName, mateId, userId);
    },
    async notice(to, mateId, fromUid) {
      try {
        console.log("알림 받는 사람 uid: ", to);
        console.log("알림이 발생한 글: ", mateId);
        console.log("당신 Uid: ", fromUid);

        const notification = {
          userId: to,
          message: `새로운 룸메이트 신청이 왔습니다`,
          is_read: false,
          created_at: new Date().toISOString(),
          mateId: mateId,
        };

        await this.$store.dispatch("notifications/createNotification", {
          uid: to,
          notification: notification,
        });
      } catch (error) {
        console.error("Error creating notification:", error.message);
      }
    },
    openModal() {
      const mate = this.mates.find((mate) => mate.id === this.id);

      const isSameUniversity = mate.university === this.currentUser.university;
      if (isSameUniversity) this.modalOpen = true;
      else {
        alert("다른 학교 게시물입니다. 신청 자격이 없습니다.");
        return;
      }
    },
    closeModal() {
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
  font-family: "Arial, sans-serif";
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
}

.preferences {
  font-style: italic;
  color: #ccc;
}

.btn-container {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
}
</style>
