<template>
  <div class="license">
    <div class="horizental">
      <div class='logo'>griffin</div>
      
        <div class="vertical" v-if="currentUser">
          <h2>{{ currentUser.name }}</h2>
          <p>{{ currentUser.email }}</p>
          <p>{{ currentUser.university }}</p>
          <p>{{ currentUser.studentId }}</p>
          <p>{{ currentUser.semester.join(', ') }}</p>
          <div class="edit"> 
            <router-link to="/userinfo">
              <div class="right"> 수정 </div>
            </router-link>
          </div>
        </div>

      <div v-else>
        <h2>로그인이 필요합니다</h2>
      </div>
    </div>
      <div class='vertical'>
      
      <div id="menu" @click="toggleMenu">
        <span v-if="!menuOpen">☰</span>
        <span v-else>X</span>
      </div>
      <transition name="slide-fade">
    <div class="dropdown-menu" v-if="menuOpen">
      <ul>
        <li @click="closeMenu">
          <router-link to="/userinfo" class="nav-link">정보 수정</router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/score" class="nav-link">학적 관리</router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/timetable" class="nav-link">시간표</router-link>
        </li>
        <li @click="closeMenu">
          <router-link
            v-if="isLoggedIn"
            @click="handleAuthAction"
            to="/"
            class="nav-link"
            >로그아웃</router-link
          >
          <router-link
            v-else
            @click="handleAuthAction"
            to="/login"
            class="nav-link"
            >로그인</router-link
          >
        </li>
      </ul>
    </div>
  </transition>
      <div class="image" :style="imageStyle" @click="triggerFileInput"></div>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        style="display: none"
      />
    </div>  
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { auth } from '@/firebase/config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import baseProfileImage from '../../assets/images/BaseProfile.svg';

export default {
  //   props: {
  //   isLoggedIn: Boolean,
  // },
  data() {
    return {
      isLoggedIn: true,
      menuOpen: false,
      imageUrl: baseProfileImage,
    };
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
    imageStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '10vh',
        height: '10vh',
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
  created(){
    onAuthStateChanged(auth, (user) => {
      this.$emit('login-success', user);
      // if (user) {
      //   this.checkNotifications();
      // }
    });
  },
  methods: {
    async loadUserImage() {
      try {
        const storage = getStorage();
        const imageRef = ref(
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
    handleAuthAction() {
      if (this.isLoggedIn) {
        signOut(auth)
          .then(() => {
            this.$store.dispatch('users/logout');
            this.$router.push('/login');
            this.$emit('login-success', null);
            if (self.name != 'reload') {
              self.name = 'reload';
              self.location.reload(true);
            } else self.name = '';
          })
          .catch((error) => {
            console.error('로그아웃 오류: ', error);
          });
      } else {
        this.$router.push('/login');
      }
      this.closeMenu();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const storage = getStorage();
        const imageRef = ref(
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
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
.license{
  display: flex;
  padding: 80px 30px 30px 30px;
  background: linear-gradient(130deg, #795ade, #6471e5);
  justify-content: space-between;
  border-radius: 0 0 10% 10%;
}
.vertical {
  position: relative;
  display: block;
  /* padding-top: 2%; */
  padding-bottom: 2%;
}
h2 {
  margin: 0;
  font-size: 22px;
  color: rgb(242, 237, 255);
}
p {
  margin: 6px 0 0 0;
  font-size: 14px;
  color: rgb(242, 237, 255);
}
.image{
  margin-top: 100px;
}
.edit{
  max-width: 50px;
  margin-top: 20px;
  height: 20px;
  background: #ececec5f;
  border-radius: 10px;
  font-size: 14px;
  color: white;
  text-align: center;
  align-content: center;
}

/* #menu {
  width: 20px;
  height: 100%;
  background-size: cover;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
} */

.dropdown-menu {
  position: absolute;
  top: 20px;
  right: -20px;
  background-color: white;
  border: 1px solid #ddd;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  z-index: 1000;
  width: 200px;
  text-align: center;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;

}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-menu a{
  color: #383838;

}

a{
  color: #FFF;
}

.logo{
  margin-bottom: 70px;
  color: #FFF;
}

#menu{
  width: 20px;
  height: 20px;
  background-size: cover;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #FFF;
  float: right;
}
span{
    /* margin-bottom: 50px; */

}
</style>
