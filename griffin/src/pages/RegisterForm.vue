<template>
  <div class="register-form">
    <h2>게시물 등록</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="form.content" required></textarea>
      </div>
      <BaseBtn @submit="submitForm">등록</BaseBtn>
    </form>
  </div>
</template>

<script>
// import BaseBtn from '../UI/BaseBtn.vue';

export default {
  name: 'RegisterForm',
  components: {
    // BaseBtn,
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      fetch('/api/posts', {
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
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<style scoped>
.register-form {
  max-width: 600px;
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

input[type='text'] {
  overflow: hidden;
  resize: none;
}

.form-group textarea {
  max-height: 60vh;
  min-height: 30vh;
  resize: none;
}
</style>
