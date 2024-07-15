<template>
  <div>
    <base-card>
      <h2>{{ title }}</h2>
      <p>
        {{ utcToKor }}<br />
        {{ content }}
      </p>
    </base-card>
    <section class="comment-section">
      <input
        type="text"
        class="comment-input"
        placeholder="댓글을 입력하세요."
      />
      <base-btn class="comment-btn">입력</base-btn>
    </section>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['id', 'name', 'title', 'content', 'time'],
  computed: {
    utcToKor() {
      return moment.utc(this.time).local().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  created() {
    console.log('Time prop: ', this.time);
  },
};
</script>

<style scoped>
h4 {
  margin: 10px;
  margin-bottom: 0;
}

p {
  margin: 10px;
  font-size: 16px;
  line-height: 1.5;
}

.comment-section {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comment-input {
  flex: 5;
  padding: 12px;
  border: none;
  font-size: 14px;
  border-radius: 10px 0 0 10px;
}

.comment-btn {
  flex: 1;
  border-radius: 0 8px 8px 0;
  background-color: #c4babc;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.profile {
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  background-image: url("../../assets/images/BaseProfile.svg");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 3%;
}

.title-header {
  display: flex;
  align-items: center;
}
</style>
