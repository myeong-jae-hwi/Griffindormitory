<template>
  <div class="edit-box">
    <h2>정보 수정</h2>

    <div class="horizontal">
      <div class="vertical">
        <div class="image" :style="imageStyle"></div>
      </div>
      <div v-if="currentUser" id="userName">
        <p>{{ userName }}</p>
      </div>
    </div>

    <div class="edit">
      <form @submit.prevent="handleNameSubmit">
        <div class="user-box">
          <input type="text" v-model="name" />
          <label>이름</label>
          <!-- <base-btn type="submit" class="btn">변경</base-btn> -->
          <!-- <button type="submit" class="submit-btn">이름 수정</button> -->
        </div>
      </form>
      <form @submit.prevent="handleUniversitySubmit">
        <div class="user-box">
          <input type="text" v-model="university" />
          <label>대학교</label>
          <!-- <base-btn type="submit" class="btn">변경</base-btn> -->
        </div>
      </form>
      <form @submit.prevent="handleStudentIdSubmit">
        <div class="user-box">
          <input type="text" v-model="studentId" />
          <label>학번</label>
          <!-- <base-btn type="submit" class="btn">변경</base-btn> -->
        </div>
      </form>
      <form @submit.prevent="handleEmailSubmit">
        <div class="user-box">
          <input type="email" v-model="email" />
          <label>이메일</label>
          <!-- <base-btn type="submit" class="btn">변경</base-btn> -->
        </div>
      </form>
      <form @submit.prevent="handlePasswordSubmit">
        <div class="user-box">
          <input type="password" v-model="password" />
          <label>비밀번호</label>
          <!-- <base-btn type="submit" class="btn">변경</base-btn> -->
        </div>
      </form>
      <form @submit.prevent="submitData">
        <base-btn type="submit" class="btn">변경</base-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { update, ref as dbRef } from 'firebase/database';
import { db, auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import baseProfileImage from '../../assets/images/BaseProfile.svg';
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import BaseBtn from '../UI/BaseBtn.vue';

export default {
  components: { BaseBtn },
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
      imageUrl: baseProfileImage,
    };
  },
  created() {
    this.name = this.userName;
    this.email = this.userEmail;
    this.studentId = this.userStudentId;
    this.university = this.userUniversity;
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
    userName() {
      return this.$store.state.users.users[0]?.name || 'Unknown';
    },
    userEmail() {
      return this.$store.state.users.users[0]?.email || '';
    },
    userStudentId() {
      return this.$store.state.users.users[0]?.studentId || '';
    },
    userUniversity() {
      return this.$store.state.users.users[0]?.university || '';
    },

    imageStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '13vh',
        height: '13vh',
        borderRadius: '50%',
        marginLeft: '3%',
        cursor: 'pointer',
      };
    },
  },
  async mounted() {
    if (this.userId && !this.currentUser) {
      await this.$store.dispatch('users/fetchUserInitialData', {
        uid: this.userId,
      });
    }
    if (this.currentUser) {
      this.loadUserImage();
    }
  },
  methods: {
    async loadUserImage() {
      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `users/${this.currentUser.id}/profile.jpg`
        );
        const url = await getDownloadURL(imageRef);
        this.imageUrl = url;
      } catch (error) {
        console.error('Failed to load user image', error);
        this.imageUrl = baseProfileImage;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `users/${this.currentUser.id}/profile.jpg`
        );
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        this.imageUrl = url;
      } catch (error) {
        console.error('Upload error user image', error);
      }
    },
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
          await update(dbRef(db, 'users/' + user.uid), {
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
          await update(dbRef(db, 'users/' + user.uid), {
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
          await update(dbRef(db, 'users/' + user.uid), {
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
          await update(dbRef(db, 'users/' + user.uid), {
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
    async submitData() {
      try {
        const user = await this.checkAuth();
        if (!user || !user.uid) {
          console.error('Invalid user data:', user);
          alert(
            '사용자 정보를 가져오는 데 실패했습니다. 다시 로그인해 주세요.'
          );
          this.$router.push('/login');
          return;
        }

        console.log('Updating data for user ID:', user.uid);
        console.log('Database object:', db);

        const userRef = dbRef(db, `users/${user.uid}`);
        console.log('Database reference path:', userRef.toString());

        await update(userRef, {
          name: this.name,
          university: this.university,
          studentId: this.studentId,
          email: this.email,
        });

        alert('정보가 수정되었습니다.');
        await signOut(auth);
        this.$store.dispatch('users/logout');
        this.$router.push('/login');
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
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 30px;
}

h3 {
  text-align: center;
  margin: 0;
  padding-top: 10%;
}

.user-box {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  max-height: 50px;
}

.user-box input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #333;
  border: none;
  background-color: #dfdfdf;
  border-radius: 8px;
  margin-top: 10px;
  outline: none;
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  /* color: #aaa; */
  pointer-events: none;
  transition: 0.5s;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -20px;
  left: 0;
  font-size: 12px;
}

.vertical {
  display: flex;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
}

.horizontal {
  display: flex;
  flex-direction: column;
}

#userName {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
}

.edit {
  margin-top: 30px;
}

.btn {
  max-width: 60px;
  max-height: 40px;
  min-width: 50px;
  padding: 0px;
  float: right;
}
</style>
