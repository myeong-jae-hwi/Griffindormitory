<!--
07/27 민재
 - 각 router-link icon 추가 예정
 - 홈, 시간표, 설정, 알람 ? 조금 더 고민해보자
 - TheHeader의 dropdown-menu animation이 활성화 되면 footer가 밀리는 상황 발생
-->

<template>
  <footer class="footer">
    <div class="footer-content">
      <nav>
        <router-link to="/info" class="footer-link">홈</router-link>
        <router-link to="/timetable" class="footer-link">시간표</router-link>
        <router-link to="/setting" class="footer-link">설정</router-link>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 15px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  margin-top: 10px;
}

.footer-link {
  margin: 0 10px;
  font-size: 0.9em;
  color: #007bff;
  text-decoration: none;
}
</style>
