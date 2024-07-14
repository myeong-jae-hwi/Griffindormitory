<template>
  <div class="roommate-register-form">
    <h2>룸메이트 모집 게시물 등록</h2>
    <base-card>
      <form @submit.prevent="submitForm">
        <div>
          <label>모집 인원</label>
          <input type="radio" name="count" v-model="form.count" value="1" />
          <label for="1">1명</label>
          <input type="radio" name="count" v-model="form.count" value="2" />
          <label for="2">2명</label>
          <input type="radio" name="count" v-model="form.count" value="3" />
          <label for="3">3명</label>
        </div>

        <div>
          <label>성별</label>
          <input type="radio" name="sex" v-model="form.sex" value="male" />
          <label for="male">남자</label>
          <input type="radio" name="sex" v-model="form.sex" value="female" />
          <label for="female">여자</label>
        </div>

        <div>
          <label>기숙사</label>
          <input
            type="radio"
            name="location"
            v-model="form.location"
            value="east"
          />
          <label for="east">동관</label>
          <input
            type="radio"
            name="location"
            v-model="form.location"
            value="west"
          />
          <label for="west">서관</label>
        </div>
        <div>
          <label>기타</label>
          <input type="radio" name="etc" v-model="form.etc" value="smoke" />
          <label for="smoke">흡연</label>
          <input type="radio" name="etc" v-model="form.etc" value="drink" />
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
        <base-btn type="submit">등록</base-btn>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RoomMateRegisterForm',
  data() {
    return {
      form: {
        count: null,
        sex: null,
        location: null,
        etc: null,
        preferences: '',
      },
    };
  },
  methods: {
    ...mapActions(['registerMate']),
    async submitForm() {
      try {
        await this.registerMate(this.form);
        console.log('Form submitted:', this.form);
        this.form.count = null;
        this.form.sex = null;
        this.form.location = null;
        this.form.etc = null;
        this.form.preferences = '';
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    },
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
  },
};
</script>
