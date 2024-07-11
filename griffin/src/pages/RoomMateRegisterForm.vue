<template>
  <div class="roommate-register-form">
    <h2>룸메이트 모집 게시물 등록</h2>
    <form @submit.prevent="submitForm">
      <!-- <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="form.title" required />
      </div> -->
      <div>
        <label>모집 인원</label>
        <input type="radio" name="count" value="1" />
        <label for="1">1명</label>
        <input type="radio" name="count" value="2" />
        <label for="2">2명</label>
        <input type="radio" name="count" value="3" />
        <label for="3">3명</label>
      </div>

      <div>
        <label>성별</label>
        <input type="radio" name="sex" value="male" />
        <label for="male">남자</label>
        <input type="radio" name="sex" value="female" />
        <label for="female">여자</label>
      </div>

      <div>
        <label>기숙사</label>
        <input type="radio" name="location" value="east" />
        <label for="east">동관</label>
        <input type="radio" name="location" value="west" />
        <label for="west">서관</label>
      </div>
      <div>
        <label>기타</label>
        <input type="radio" name="etc" value="smoke" />
        <label for="smoke">흡연</label>
        <input type="radio" name="etc" value="drink" />
        <label for="drink">음주</label>
      </div>

      <label>기상 시간</label>
      <input type="time" />

      <div class="form-group">
        <label for="preferences">선호 사항</label>
        <textarea
          id="preferences"
          v-model="form.preferences"
          @input="adjustHeight($event)"
          ref="preferencesInput"
          required
        ></textarea>
      </div>
      <base-btn @submit="submitForm">등록</base-btn>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RoomMateRegisterForm',
  data() {
    return {
      form: {
        title: '',
        content: '',
        location: '',
        preferences: '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      fetch('/api/roommate-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.form.title = '';
          this.form.content = '';
          this.form.location = '';
          this.form.preferences = '';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
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
.roommate-register-form {
  width: 80%;
  margin: 2vh auto;
  padding: 20px;
  background-color: #78aef5;
  border: 1px solid #78aef5;
  border-radius: 2vh;
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 20px;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

textarea {
  resize: none;
}

input[type='text'] {
  overflow: hidden;
  resize: none;
}
</style>
