<template>
  <section class="not-found">
    <h1>Page Not Found</h1>
    <img src="../assets/images/NotFound.png" />
    <p>
      죄송합니다. 페이지를 찾을 수 없습니다.<br />
      존재하지 않는 주소를 입력하셨거나<br />
      요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
    </p>
    <router-link to="/info" class="home-link">홈으로</router-link>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
  color: #333;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #323030;
  animation: fadeIn 1s ease-in-out;
}

p {
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #221f1f;
}

img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 30px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #c4babc;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #4c4a4a;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
