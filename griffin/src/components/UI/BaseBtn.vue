<template>
  <div class="btn-container">
    <button class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #c4babc;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 14px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.btn:hover,
.btn:active,
.btn:focus {
  background: #4c4a4a;
}
</style>
