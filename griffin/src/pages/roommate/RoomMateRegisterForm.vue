<template>
  <div class="register-form">
    <h2>룸메이트 모집 게시물 등록</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label class="title">제목</label>
        <input type="text" name="title" v-model="form.title" required />
      </div>

      <div class="form-group">
        <label>모집 인원</label>
        <div class="radio-group">
          <input
            type="radio"
            id="count1"
            name="count"
            v-model="form.count"
            value="1"
            required
          />
          <label for="count1">1명</label>

          <input
            type="radio"
            id="count2"
            name="count"
            v-model="form.count"
            value="2"
          />
          <label for="count2">2명</label>

          <input
            type="radio"
            id="count3"
            name="count"
            v-model="form.count"
            value="3"
          />
          <label for="count3">3명</label>
        </div>
      </div>

      <div class="form-group">
        <label>성별</label>
        <div class="radio-group">
          <input
            type="radio"
            id="male"
            name="sex"
            v-model="form.sex"
            value="male"
            required
            :disabled="true"
          />
          <label for="male">남자</label>

          <input
            type="radio"
            id="female"
            name="sex"
            v-model="form.sex"
            value="female"
            :disabled="true"
          />
          <label for="female">여자</label>
        </div>
      </div>

      <div class="form-group">
        <label>기숙사</label>
        <div class="radio-group">
          <input
            type="radio"
            id="east"
            name="location"
            v-model="form.location"
            value="east"
            required
          />
          <label for="east">동관</label>

          <input
            type="radio"
            id="west"
            name="location"
            v-model="form.location"
            value="west"
          />
          <label for="west">서관</label>
        </div>
      </div>

      <div class="form-group">
        <label>흡연 여부</label>
        <div class="radio-group">
          <input
            type="radio"
            id="notsmoke"
            name="besmoke"
            v-model="form.besmoke"
            value="notsmoke"
            required
          />
          <label for="notsmoke">비흡연자만</label>

          <input
            type="radio"
            id="smoke"
            name="besmoke"
            v-model="form.besmoke"
            value="smoke"
          />
          <label for="smoke">상관없음</label>
        </div>
      </div>

      <div class="form-group">
        <label>기상 시간(선택)</label>
        <input type="time" v-model="form.wakeupTime" />
      </div>

      <div class="form-group">
        <label for="preferences">기타 선호 사항</label>
        <textarea
          id="preferences"
          v-model="form.preferences"
          @input="adjustHeight($event)"
          ref="preferencesInput"
          required
        ></textarea>
      </div>

      <div class="btn-container">
        <base-btn type="submit">등록</base-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RoomMateRegisterForm',
  computed: {
    ...mapGetters('users', ['currentUser']),
    userUniversity() {
      return this.currentUser.university;
    },
    userId() {
      return this.$store.state.users.userID;
    },
  },
  data() {
    return {
      form: {
        title: '',
        count: null,
        sex: null,
        location: null,
        besmoke: null,
        preferences: '',
        university: '',
        userUid: null,
      },
    };
  },
  created() {
    this.form.university = this.userUniversity;
    this.form.userUid = this.userId;
    this.form.sex = this.currentUser.gender;
  },
  methods: {
    ...mapActions(['registerMate']),
    async submitForm() {
      try {
        await this.registerMate(this.form);
        this.form.title = '';
        this.form.count = null;
        this.form.sex = null;
        this.form.location = null;
        this.form.besmoke = null;
        this.form.preferences = '';
        this.form.university = null;
        this.form.userUid = null;
        alert('게시물이 성공적으로 등록되었습니다.');
        this.$router.push('/roommateboard');
      } catch (error) {
        console.error('게시물 등록 실패:', error);
        alert('게시물 등록에 실패했습니다.');
      }
    },
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
  },
};
</script>

<style scoped>
.register-form {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f8f8f8, #fff);
  border: 1px solid #ddd;
  border-radius: 15px;
}

h2 {
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.form-group {
  margin-bottom: 15px;
}
.title {
  display: block;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  font-family: 'Roboto', sans-serif;
}
input[type='radio'] {
  margin-left: 15px;
}
input[type='text'],
input[type='time'],
textarea {
  width: 100%;
  padding: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
}
textarea {
  resize: none;
  overflow: hidden;
}
</style>
