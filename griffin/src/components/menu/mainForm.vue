<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="../../assets/images/Logo.png" class="logo">
      <h1 class="app-name">GRIFFIN DOMITORY</h1>
    </div>
    <router-link to="/login" class="sign-in-button">로그인</router-link>
    <router-link to='/signup' class="sign-up-text">회원가입</router-link>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(130deg, #795ade, #6471e5);
  padding: 20px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  filter: invert(100%)
}

.app-name {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.sign-in-button {
  background-color: white;
  color: #6471e5;
  width: auto;
  border: none;
  border-radius: 20px;
  padding: 10px 80px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  text-align: center;
}

.sign-up-text {
  color: white;
  font-size: 14px;
  cursor: pointer;
}
</style>