<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.base-card {
  width: clac(100% - 20px);
  height: 18vh;
  background-color: #fcfcfc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 3vh;
  border-radius: 22px;
}
</style>
