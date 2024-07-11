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
  width: auto;
  height: auto;
  background-color: #fcfcfc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
  padding: 5px;
  border-radius: 22px;
  box-shadow: 4px 4px 0px 0px #f0f0f0d7;
}
</style>
