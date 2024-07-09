<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>
  
<style scoped>
.btn {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.btn:hover,.btn:active,.btn:focus {
  background: #43A047;
}
</style>

