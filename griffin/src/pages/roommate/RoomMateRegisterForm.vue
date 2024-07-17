<template>
  <div class="register-form">
    <h2>룸메이트 모집 게시물 등록</h2>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>모집 인원</label>
          <input
            type="radio"
            name="count"
            v-model="form.count"
            value="1"
            required
          />
          <label for="1">1명</label>
          <input type="radio" name="count" v-model="form.count" value="2" />
          <label for="2">2명</label>
          <input type="radio" name="count" v-model="form.count" value="3" />
          <label for="3">3명</label>
        </div>

        <div class="form-group">
          <label>성별</label>
          <input
            type="radio"
            name="sex"
            v-model="form.sex"
            value="male"
            required
          />
          <label for="male">남자</label>
          <input type="radio" name="sex" v-model="form.sex" value="female" />
          <label for="female">여자</label>
        </div>

        <div class="form-group">
          <label>기숙사</label>
          <input
            type="radio"
            name="location"
            v-model="form.location"
            value="east"
            required
          />
          <label for="east">동관</label>
          <input
            type="radio"
            name="location"
            v-model="form.location"
            value="west"
          />
          <label for="west">서관</label>
        </div>
        <div class="form-group">
          <label>흡연 여부</label>
          <input
            type="radio"
            name="besmoke"
            v-model="form.besmoke"
            value="notsmoke"
            required
          />
          <label for="notsmoke">비흡연자만</label>
          <input
            type="radio"
            name="besmoke"
            v-model="form.besmoke"
            value="smoke"
          />
          <label for="smoke">상관없음</label>
        </div>
        <div class="form-group">
          <label>기상 시간</label>
          <input type="time" required />
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
        <base-btn type="submit">등록</base-btn>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RoomMateRegisterForm',
  data() {
    return {
      form: {
        count: null,
        sex: null,
        location: null,
        besmoke: null,
        preferences: '',
      },
    };
  },
  methods: {
    ...mapActions(['registerMate']),
    async submitForm() {
      try {
        await this.registerMate(this.form);
        console.log('Form submitted:', this.form);
        this.form.count = null;
        this.form.sex = null;
        this.form.location = null;
        this.form.besmoke = null;
        this.form.preferences = '';
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
  border: 1px solid #ccc;
  border-radius: 2vh;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.base-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}
input[type='radio'] {
  margin-right: 5px;
}
input[type='time'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  overflow: hidden;
}
</style>
