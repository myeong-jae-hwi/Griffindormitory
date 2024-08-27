<!--
<template>
  <div class="login-container">
    <div class="login-box">
      <h2>회원가입</h2>
      <form @submit.prevent="handleSubmit">
        <div class="user-box">
          <input type="text" v-model="name" required />
          <label>이름</label>
        </div>
        <div class="user-box">
          <input type="text" v-model="university" required />
          <label>대학교</label>
        </div>
        <div class="user-box">
          <input type="text" v-model="studentId" required />
          <label>학번 또는 수험 응시 번호</label>
        </div>
        <div class="user-box">
          <select v-model="gender" required>
            <option value="">성별 선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <label>성별</label>
        </div>
        <div class="user-box">
          <input type="email" v-model="email" required />
          <label>이메일</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="password" required />
          <label>비밀번호</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="confirmPassword" required />
          <label>비밀번호 확인</label>
        </div>
        <div>
          <button type="submit" class="submit-btn">회원가입</button>
        </div>
        <router-link to='/login'>로그인</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default {
  name: 'SignupForm',
  data() {
    return {
      name: '',
      university: '',
      studentId: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    validateForm() {
      if (!this.email) {
        alert('이메일을 입력하세요.');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(this.email)) {
        alert('유효한 이메일 주소를 입력하세요.');
        return false;
      }
      if (!this.password) {
        alert('비밀번호를 입력하세요.');
        return false;
      }
    },
    async handleSubmit() {
    //   if (!this.validateForm()) {
    //     console.log('aaa')
    //     return;
    //     }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        const userRef = ref(db, 'users/' + user.uid);
        await set(userRef, {
          name: this.name,
          university: this.university,
          studentId: this.studentId,
          gender: this.gender,
          email: this.email,
          createdAt: new Date().toISOString(),
        });
        this.$store.commit('users/setUserId', user.uid);
        await this.$store.dispatch('users/fetchUserInitialData', {
          uid: user.uid,
        });

        alert('회원가입 성공 하였습니다!');
        this.$emit('login-success', user);
        this.$router.push('/info');
      } catch (error) {
        console.error('회원가입 오류: ', error);
        this.handleAuthError(error);
      }
    },
    handleAuthError(error) {
      console.log('error: ',error)
    },
  },
};
</script>

<style scoped>

</style>
-->

<template>
  <div class="signup-container">

      <h2>회원가입</h2>
    <div class="user">
      <form @submit.prevent="handleSignUp">
        <div class="user-box">
          <input type="text" v-model="name" required />
          <label>이름</label>
        </div>
        <div class="user-box">
          <input type="text" v-model="university" required />
          <label>대학교</label>
        </div>
        <div class="user-box">
          <input type="text" v-model="studentId" required />
          <label>학번 또는 수험 응시 번호</label>
        </div>
        <div class="user-box">
          <select v-model="gender" required>
            <option value="" disabled selected hidden></option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
          <label>성별</label>
        </div>
        <div class="user-box">
          <input type="email" v-model="email" required />
          <label>이메일</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="password" required />
          <label>비밀번호</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="confirmPassword" required />
          <label>비밀번호 확인</label>
        </div>
        <div>
          <base-btn type="submit" class="submit-btn">
            회원가입
          </base-btn>
        </div>

        <div class="login">
          <router-link to="/login">로그인</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export default {
  name: "SignUpForm",
  data() {
    return {
      name: "",
      university: "",
      studentId: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    validateForm() {
      if (!this.name) {
        alert("이름을 입력하세요.");
        return false;
      }
      if (!this.university) {
        alert("대학교를 입력하세요.");
        return false;
      }
      if (!this.studentId) {
        alert("학번 또는 수험 응시 번호를 입력하세요.");
        return false;
      }
      if (!this.gender) {
        alert("성별을 선택하세요.");
        return false;
      }
      if (!this.email) {
        alert("이메일을 입력하세요.");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(this.email)) {
        alert("유효한 이메일 주소를 입력하세요.");
        return false;
      }
      if (!this.password) {
        alert("비밀번호를 입력하세요.");
        return false;
      }
      if (this.password !== this.confirmPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return false;
      }
      return true;
    },
    async handleSignUp() {
      if (!this.validateForm()) return;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        const userRef = ref(db, "users/" + user.uid);
        await set(userRef, {
          name: this.name,
          university: this.university,
          studentId: this.studentId,
          gender: this.gender,
          email: this.email,
          createdAt: new Date().toISOString(),
        });

        alert("회원가입 성공 하였습니다!");
        this.$router.push("/info");
      } catch (error) {
        console.error("회원가입 오류: ", error);
        this.handleAuthError(error);
      }
    },
    handleAuthError(error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 사용 중인 이메일입니다.");
          break;
        case "auth/invalid-email":
          alert("유효하지 않은 이메일 주소입니다.");
          break;
        case "auth/weak-password":
          alert("비밀번호가 너무 약합니다. 더 복잡한 비밀번호를 사용하세요.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  filter: invert(100%);
}

.signup-container h2 {
  margin: 50px 0 30px 0;
  padding: 0;
  color: #212121;
  text-align: center;
}

.user {
  padding: 20px;
}

.user-box {
  position: relative;
}

.logo-container {
  height: 40vh;
  background: linear-gradient(130deg, #795ade, #6471e5);
  justify-content: center;
}

.user-box input,
.user-box select {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #403e3e;
  outline: none;
  background: transparent;
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label,
.user-box select:focus ~ label,
.user-box select:valid ~ label {
  top: -20px;
  left: 0;
  color: #87acf6;
  font-size: 12px;
}

.login {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  text-decoration: underline;
}

.login a {
  color: #87acf6;
}
</style>
