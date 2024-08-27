<template>
  <div class='header'>
    <h3>
        <font-awesome-icon icon="chevron-left" @click="goBack" />
    </h3>
    <h3>룸메이트 모집 게시판</h3>
    <h3>
        <font-awesome-icon icon="ellipsis-vertical" />
    </h3>
  </div>
    <div class="card-container">
      <base-card>
        <div v-if="currentUser.id === mateUid" class="delete-btn-container">
          <font-awesome-icon @click="deleteBoard" icon="trash" />
        </div>
        <div class="card-content">
          <h2>
            {{ mateTitle }}
            <font-awesome-icon
              :icon="mateSex === 'male' ? 'mars' : 'venus'"
              :style="{ color: mateSex === 'male' ? 'skyblue' : 'pink' }"
            />
          </h2>
          <p>
            <!-- 성별: <strong>{{ mateSex === 'male' ? '남자' : '여자' }}</strong> -->
          </p>
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
      mateTitle: "",
      mateCount: null,
      mateSex: null,
      mateBesmoke: null,
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
    mateUid() {
      const mate = this.mates.find((mate) => mate.id === this.id);
      return mate ? mate.userUid : null;
    },
    userId() {
      return this.$store.state.users.userID;
    },
  },
  created() {
    this.fetchData();
    // this.$store.dispatch("fetchInitialData");
  },


  methods: {
    submitData() {
      const mate = this.mates.find((mate) => mate.id === this.id);
      const userUid = mate.userUid;
      // const userName = this.userName;
      const mateId = this.postId;
      const userId = this.userId;
      console.log(mateId);

      this.notice(userUid, mateId, userId);
      this.submissionSuccess = true;
      this.modalOpen = true;
    },
    goBack() {
      window.history.back();
    },
    async deleteMate() {
      const confirmation = window.confirm("게시물을 삭제하시겠습니까 ?");
      if (!confirmation) return;
      try {
        await this.$store.dispatch("deleteMate", this.id);
        alert("게시물을 삭제하셨습니다.");
        this.$router.push("/roommateboard");
      } catch (error) {
        console.error("Error deleting mate:", error.message);
      }
    },
    async notice(to, mateId, fromUid) {
      try {
        console.log(fromUid);
        const notification = {
          userId: to,
          mateId: mateId,
          message: `새로운 룸메이트 신청이 왔습니다`,
          is_read: false,
          created_at: new Date().toISOString(),
        };

        await this.$store.dispatch("notifications/createNotification", {
          uid: to,
          notification: notification,
        });
      } catch (error) {
        console.error("Error creating notification:", error.message);
      }
    },
    
    async fetchData() {
      await this.$store.dispatch("fetchInitialData", this.id);
      const mate = this.mates.find((mate) => mate.id === this.id);
      this.mateTitle = mate.title;
      this.mateCount = mate.count;
      this.mateCurrent = Number(mate.current);
      this.mateBesmoke = mate.besmoke;
      this.matePreference = mate.preference;
      this.mateSex = mate.sex;
      this.mateLocation = mate.location;
    },

    openModal() {
      if (this.currentUser.gender !== this.sex) {
        alert("성별이 맞지 않아 신청할 수 없습니다.");
        return;
      }

      if (this.currentUser.id === this.mateUid) {
        alert("내가 쓴 글에는 신청할 수 없습니다.");
        return;
      }

      if (this.mateCount <= this.mateCurrent) {
        alert("인원 모집이 마감되었습니다.");
        return;
      }
      const mate = this.mates.find((mate) => mate.id === this.id);
      const isSameUniversity = mate.university === this.currentUser.university;
      if (isSameUniversity) this.modalOpen = true;
      else {
        alert("다른 학교 게시물입니다. 신청 자격이 없습니다.");
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
.delete-btn-container {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.card-container {
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  /* height: 100%; */
}

.card-content {
  padding: 20px;
  font-family: "Arial, sans-serif";
  color: rgb(52, 52, 52);
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

h3{
  display: inline-block;
}

</style>
