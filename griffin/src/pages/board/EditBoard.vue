<template>
  <div class="register-form">
    <h2>게시물 수정</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model.trim="form.title" required />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model.trim="form.content" required></textarea>
      </div>
      <base-btn type="submit">수정하기</base-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditBoard',
  computed: {
    ...mapGetters('users', ['currentUser']),
    userName() {
      return this.$store.state.users.users[0].name;
    },
    userUid() {
      return this.$store.state.users.users[0].id;
    },
    userUniversity() {
      return this.currentUser.university;
    },
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
    };
  },
  created() {
    const boardId = this.$route.params.id;
    this.loadBoardData(boardId);
  },
  methods: {
    loadBoardData(boardId) {
      const board = this.$store.getters['boards/getBoardById'](boardId);

      if (board) {
        this.form.title = board.title;
        this.form.content = board.content;
      } else {
        alert('게시물을 불러오는 데 실패했습니다.');
        this.$router.push('/boardlist');
      }
    },
    async submitForm() {
      if (!this.form.title.trim() || !this.form.content.trim()) {
        alert('제목과 내용을 모두 입력해 주세요.');
        return;
      }

      try {
        const updatedBoard = {
          ...this.form,
          id: this.$route.params.id,
          userUid: this.userUid,
          university: this.userUniversity,
          author: this.userName,
        };
        await this.$store.dispatch('boards/updateBoard', updatedBoard);
        alert('게시물이 성공적으로 수정되었습니다.');
        this.$router.push('/boardlist');
      } catch (error) {
        console.error('게시물 수정 실패:', error);
        alert('게시물 수정에 실패했습니다.');
      }
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.form-group textarea {
  max-height: 60vh;
  min-height: 30vh;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
