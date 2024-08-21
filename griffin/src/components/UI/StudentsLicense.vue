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
import baseProfileImage from '../../assets/images/BaseProfile.svg';

export default {
  data() {
    return {
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
        backgroundSize: 'contain',
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
