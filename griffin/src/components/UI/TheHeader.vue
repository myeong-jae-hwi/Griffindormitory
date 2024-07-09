<template>
  <header>
    <div class="left-section">
      <img src="../../images/Logo.png" alt="Logo" class="logo">
    </div>
    <div class="center-section">
      <h1>Griffin</h1>
    </div>
    <div class="right-section">
      <div id="alarm"></div>
      <div id="menu"></div>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style scoped>
@font-face {
    font-family: 'Dovemayo_gothic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.1/Dovemayo_gothic.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 8vh;
    background-color: #ffffff;
    margin-bottom: 30px;
    box-shadow: 0px 4px 0px 0px #f0f0f0d7;
  }
  .left-section {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .logo {
    height: 40px;
  }
  .center-section {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center-section h1 {
    font-size: 1.5em;
    font-family:'Dovemayo_gothic';
  }
  .right-section {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  #alarm {
    width: 20px;
    height: 20px;
    background-image: url('../../images/bell.png');
    background-size: cover;
    margin-right: 10px;
  }
  #menu {
    width: 20px;
    height: 20px;
    background-image: url('../../images/menu.png');
    background-size: cover;
  }
</style>
