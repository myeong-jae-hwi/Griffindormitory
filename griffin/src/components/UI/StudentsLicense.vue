<template>
  <base-card>
    <div class="image" :style="imageStyle" @click="triggerFileInput"></div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      style="display: none"
    />
    <div class="vertical" v-if="currentUser">
      <h2>{{ currentUser.name }}</h2>
      <p>{{ currentUser.email }}</p>
      <p>{{ currentUser.university }}</p>
      <p>{{ currentUser.studentId }}</p>
      <p>{{ currentUser.semester.join(', ') }}</p>
    </div>

    <div v-else>
      <h2>로그인이 필요합니다</h2>
    </div>
  </base-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import baseProfileImage from '../../assets/images/BaseProfile.svg';

export default {
  data() {
    return {
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
  },
};
</script>

<style scoped>
.vertical {
  position: relative;
  display: block;
  margin-left: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
}
h2 {
  margin: 0;
  font-size: 18px;
}
p {
  margin: 6px 0 0 0;
  font-size: 14px;
}
</style>
