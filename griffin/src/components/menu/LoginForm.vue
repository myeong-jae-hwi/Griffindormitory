<template>
  <div class="login-container">
    <div class="login-box">
      <h2>{{ isLogin ? "로그인" : "회원가입" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="user-box" v-if="!isLogin">
          <input type="text" v-model="name" required />
          <label>이름</label>
        </div>
        <div class="user-box" v-if="!isLogin">
          <input type="text" v-model="university" required />
          <label>대학교</label>
        </div>
        <div class="user-box" v-if="!isLogin">
          <input type="text" v-model="studentId" required />
          <label>학번 또는 수험 응시 번호</label>
        </div>
        <div class="user-box">
          <input type="email" v-model="email" required />
          <label>이메일</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="password" required />
          <label>비밀번호</label>
        </div>
        <div class="user-box" v-if="!isLogin">
          <input type="password" v-model="confirmPassword" required />
          <label>비밀번호 확인</label>
        </div>
        <div>
          <button type="submit" class="submit-btn">
            {{ isLogin ? "로그인" : "회원가입" }}
          </button>
        </div>
        <a href="#" @click="toggleForm">{{
          isLogin ? "회원가입" : "로그인"
        }}</a>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, database } from "@/firebase/config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export default {
  name: "LoginForm",
  data() {
    return {
      isLogin: true,
      name: "",
      university: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
      userId: null
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.name = "";
      this.university = "";
      this.studentId = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
    async handleSubmit() {
      if (this.isLogin) {
        if (!this.email || !this.password) {
          alert("모든 필드를 입력하세요.");
          return;
        }
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          console.log("로그인 성공");
          console.log("Logged in user UID:", userCredential.user.uid);
          
          console.log("여기까지 실행됨"); 
          this.$store.commit("setUserId", userCredential.user.uid);

          this.$emit("login-success", userCredential.user);
          this.$router.push("/info");
        } catch (error) {
          console.error("Firebase 오류: ", error);
          alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
      } else {
        if (
          !this.name ||
          !this.university ||
          !this.studentId ||
          !this.email ||
          !this.password ||
          !this.confirmPassword
        ) {
          alert("모든 필드를 입력하세요.");
          return;
        }
        if (this.password !== this.confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          const user = userCredential.user;
          await set(ref(database, "users/" + user.uid), {
            name: this.name,
            university: this.university,
            studentId: this.studentId,
            email: this.email,
            createdAt: new Date().toISOString(),
          });
          console.log("회원가입 성공");
          console.log("Logged in user UID:", user.uid);
          alert("회원가입 성공 하였습니다!");
          this.$emit("login-success", user);
          this.$router.push("/info");
        } catch (error) {
          console.error("Firebase 오류: ", error);
          if (error.code === "auth/email-already-in-use") {
            alert("이미 사용 중인 이메일입니다.");
          } else {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
          }
        }
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #87acf6;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #87acf6;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;
}

.submit-btn {
  background: #87acf6;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background: #1db0eae6;
}
</style>
