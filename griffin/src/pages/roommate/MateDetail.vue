<template>
  <div class="card-container">
    <base-card
      :style="{ backgroundColor: sex === 'male' ? '#4169E1' : '#DB7093' }"
    >
      <!-- <h3 class="description">
        {{ sex === 'male' ? '남자' : '여자' }}
        {{ location === 'east' ? '동관' : '서관' }} {{ count }}명
        {{ besmoke === 'notsmoke' ? '비흡연자만' : '흡연-상관없음' }}
        룸메이트 구합니다.
      </h3> -->
      <div class="card-content">
        <h2>{{ title }}</h2>
        <p>
          성별: <strong>{{ sex === 'male' ? '남자' : '여자' }}</strong>
        </p>
        <p>
          기숙사: <strong>{{ location === 'east' ? '동관' : '서관' }}</strong>
        </p>
        <p>
          모집 인원: <strong>{{ count }}/4명</strong>
        </p>
        <p>
          흡연:
          <strong>{{
            besmoke === 'notsmoke' ? '비흡연자만' : '상관없음'
          }}</strong>
        </p>
        <p class="preferences">{{ preferences }}</p>
      </div>
    </base-card>
    <div class="btn-container">
      <base-btn>신청하기</base-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'count', 'sex', 'location', 'besmoke', 'preferences'],
};
</script>

<style scoped>
.card-container {
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.card-content {
  padding: 20px;
  font-family: 'Arial, sans-serif';
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
}

.preferences {
  font-style: italic;
  color: #555;
}

.btn-container {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
}
</style>
