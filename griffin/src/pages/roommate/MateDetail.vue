<template>
  <div>
      <div class="header">
    <h3>
      <font-awesome-icon icon="chevron-left" @click="goBack" />
    </h3>
    <h3>룸메이트 모집 게시판</h3>
    <h3>
      <font-awesome-icon icon="ellipsis-vertical" />
    </h3>
  </div>
    <div class="card-container">
      <base-card class="card-view">
        <template v-if="isCurrentUserMate">
          <div class="delete-btn-container">
            <font-awesome-icon @click="deleteBoard" icon="trash" />
          </div>
        </template>
        <div class="card-content">
        <h2>
          {{ mateTitle }}
          <font-awesome-icon
            :icon="mateSex === 'male' ? 'mars' : 'venus'"
            :style="{ color: mateSex === 'male' ? 'skyblue' : 'pink' }"
          />
        </h2>
        <p>
          기숙사:
          <strong>{{ mateLocation === "east" ? "동관" : "서관" }}</strong>
        </p>
        <p>
          모집 인원: <strong>{{ mateCurrent }}/{{ mateCount }}명</strong>
        </p>
        <p>
          흡연:
          <strong>{{
            besmoke === "notsmoke" ? "비흡연자만" : "상관없음"
          }}</strong>
        </p>
        <p class="preferences">{{ matePreference }}</p>
      </div>
      </base-card>
      <div class="btn-container">
        <base-btn @click="openModal">신청하기</base-btn>
      </div>
    </div>
    <mate-modal v-if="modalOpen" @close="closeModal">
      <template #header>
        <h3>신청하기</h3>
      </template>
      <template #body>
        <user-info :user="currentUser" />
        <textarea
          v-model="applicationText"
          rows="2"
          class="application-textarea"
          placeholder="간단한 자기 소개를 적어주세요."
        ></textarea>
        <div class="btn-container">
          <base-btn @click="submitData">전송하기</base-btn>
        </div>
      </template>
    </mate-modal>
    <mate-modal v-if="submissionSuccess" @close="closeSuccessModal">
      <template #header>
        <h3>알림</h3>
      </template>
      <template #body>
        <p>전송되었습니다.</p>
        <div class="btn-container">
          <base-btn @click="closeSuccessModal">닫기</base-btn>
        </div>
      </template> 
    </mate-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MateModal from "../../components/roommate/MataModal.vue";
// import HeaderComponent from "../../components/common/HeaderComponent.vue";
// import MateInfo from "../../components/roommate/MateInfo.vue";
// import UserInfo from "../../components/user/UserInfo.vue";

export default {
  name: 'RoommateDetail',
  components: { 
    MateModal,
    // HeaderComponent,
    // MateInfo,
    // UserInfo
  },
  data() {
    return {
      modalOpen: false,
      submissionSuccess: false,
      applicationText: '',
      mateTitle: "",
      mateCount: null,
      mateSex: null,
      mateBesmoke: null,
      matePreference: null,
      mateCurrent: 0,
      mateLocation: null,
    };
  },
  computed: {
    ...mapGetters("users", ["currentUser"]),
    ...mapGetters({
      mates: "mates",
      hasMates: "hasMates",
    }),
    mate() {
      return this.mates.find(mate => mate.id === this.$route.params.id) || {};
    },
    isCurrentUserMate() {
      return this.currentUser.id === this.mate.userUid;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchInitialData", this.$route.params.id);
      const id = this.$route.params.id;
      const mate = this.mates.find((mate) => mate.id === id);
      this.mateTitle = mate.title;
      this.mateCount = mate.count;
      this.mateCurrent = Number(mate.current);
      this.mateBesmoke = mate.besmoke;
      this.matePreference = mate.preferences;
      this.mateSex = mate.sex;
      this.mateLocation = mate.location;
    },
    openModal() {
      if (!this.canApply()) return;
      this.modalOpen = true;
    },
    canApply() {
      if (this.currentUser.gender !== this.mate.sex) {
        alert("성별이 맞지 않아 신청할 수 없습니다.");
        return false;
      }
      if (this.isCurrentUserMate) {
        alert("내가 쓴 글에는 신청할 수 없습니다.");
        return false;
      }
      if (this.mate.count <= this.mate.current) {
        alert("인원 모집이 마감되었습니다.");
        return false;
      }
      if (this.mate.university !== this.currentUser.university) {
        alert("다른 학교 게시물입니다. 신청 자격이 없습니다.");
        return false;
      }
      return true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async submitData() {
      try {
        await this.$store.dispatch("notifications/createNotification", {
          uid: this.mate.userUid,
          notification: {
            userId: this.mate.userUid,
            mateId: this.mate.id,
            message: `새로운 룸메이트 신청이 왔습니다`,
            is_read: false,
            created_at: new Date().toISOString(),
          },
        });
        this.submissionSuccess = true;
      } catch (error) {
        console.error("Error creating notification:", error.message);
        alert("신청 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    },
    closeSuccessModal() {
      this.submissionSuccess = false;
      this.modalOpen = false;
      this.applicationText = '';
    },
    goBack() {
      this.$router.back();
    },
    openMenu() {
      // Implement menu opening logic
    },
    async deleteBoard() {
      if (!confirm("게시물을 삭제하시겠습니까?")) return;
      try {
        await this.$store.dispatch("deleteMate", this.mate.id);
        alert("게시물을 삭제하셨습니다.");
        this.$router.push("/roommateboard");
      } catch (error) {
        console.error("Error deleting mate:", error.message);
        alert("게시물 삭제 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.delete-btn-container {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.application-textarea{
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
.card-container {
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  /* height: 100%; */
}

.dark-mode .card-view {
  background-color: rgb(52, 52, 62);
}

.card-content {
  padding: 20px;
  font-family: "Arial, sans-serif";
  color: rgb(52, 52, 52);
}

.dark-mode .card-content {
  color: rgb(220, 220, 220);
}

p {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
}

.preferences {
  /* font-style: italic; */
  font-size: 14px;
  /* color: white; */
}

.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
}

.btn-container {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
}

h3 {
  display: inline-block;
}
</style>