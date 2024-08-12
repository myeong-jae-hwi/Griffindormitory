<template>
  <div class="edit-box">
    <h2>정보 수정</h2>
    <form @submit.prevent="handleNameSubmit">
      <div class="user-box">
        <input type="text" v-model="name" />
        <label>이름</label>
        <button type="submit" class="submit-btn">이름 수정</button>
      </div>
    </form>
    <form @submit.prevent="handleUniversitySubmit">
      <div class="user-box">
        <input type="text" v-model="university" />
        <label>대학교</label>
        <button type="submit" class="submit-btn">대학교 수정</button>
      </div>
    </form>
    <form @submit.prevent="handleStudentIdSubmit">
      <div class="user-box">
        <input type="text" v-model="studentId" />
        <label>학번</label>
        <button type="submit" class="submit-btn">학번 수정</button>
      </div>
    </form>
    <form @submit.prevent="handleEmailSubmit">
      <div class="user-box">
        <input type="email" v-model="email" />
        <label>이메일</label>
        <button type="submit" class="submit-btn">이메일 수정</button>
      </div>
    </form>
    <form @submit.prevent="handlePasswordSubmit">
      <div class="user-box">
        <input type="password" v-model="password" />
        <label>비밀번호</label>
        <button type="submit" class="submit-btn">비밀번호 수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, update } from 'firebase/database';
import { db, auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export default {
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      name: '',
      university: '',
      studentId: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async checkAuth() {
      const user = auth.currentUser;
      if (!user) {
        alert('로그인이 필요합니다.');
        this.$router.push('/login');
        return null;
      }
      console.log('Logged in user UID:', user.uid);
      return user;
    },
    async handleNameSubmit() {
      try {
        const user = await this.checkAuth();
        if (user) {
          await update(ref(db, 'users/' + user.uid), {
            name: this.name,
          });
          alert('이름이 수정되었습니다.');
          await signOut(auth);
          this.$store.dispatch('users/logout');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Firebase 오류: ', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
    async handleUniversitySubmit() {
      try {
        const user = await this.checkAuth();
        if (user) {
          await update(ref(db, 'users/' + user.uid), {
            university: this.university,
          });
          alert('대학교가 수정되었습니다.');
          await signOut(auth);
          this.$store.dispatch('users/logout');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Firebase 오류: ', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
    async handleStudentIdSubmit() {
      try {
        const user = await this.checkAuth();
        if (user) {
          await update(ref(db, 'users/' + user.uid), {
            studentId: this.studentId,
          });
          alert('학번이 수정되었습니다.');
          await signOut(auth);
          this.$store.dispatch('users/logout');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Firebase 오류: ', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
    async handleEmailSubmit() {
      try {
        const user = await this.checkAuth();
        if (user) {
          await user.updateEmail(this.email);
          await update(ref(db, 'users/' + user.uid), {
            email: this.email,
          });
          alert('이메일이 수정되었습니다.');
          await signOut(auth);
          this.$store.dispatch('users/logout');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Firebase 오류: ', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
    async handlePasswordSubmit() {
      try {
        const user = await this.checkAuth();
        if (user) {
          await user.updatePassword(this.password);
          alert('비밀번호가 수정되었습니다.');
          await signOut(auth);
          this.$store.dispatch('users/logout');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Firebase 오류: ', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  },
};
</script>

<style scoped>
.edit-box {
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.user-box {
  position: relative;
  margin-bottom: 30px;
}

.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background: transparent;
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #aaa;
  pointer-events: none;
  transition: 0.5s;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #333;
  font-size: 12px;
}

.submit-btn {
  background-color: #5cb85c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #4cae4c;
}
</style>
