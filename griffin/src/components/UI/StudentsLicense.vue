<template>
  <base-card>
    <div class="image">
    </div>
    <div class="vertical">
      <h2>홍길동</h2>
      <p>2000.12.02</p>
      <p>지능로봇공학과</p>
      <p>1958012</p>
    </div>
  </base-card>
</template>

<script>
export default {
}

</script>

<style scoped>
.image {
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-image: url("../../assets/images/BaseProfile.svg");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 3%;
}
.vertical{
  position: relative;
  display: block;
  margin-left: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
}
h2{
  margin: 0;
}
p{
  margin: 8px;
}

</style>