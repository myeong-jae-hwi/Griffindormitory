<template>
  <div :class="{ 'dark-card': isDarkMode }" class="base-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['isDarkMode'],
};
</script>

<style scoped>
.base-card {
  width: auto;
  height: auto;
  background-color: #fcfcfc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 20px 20px 20px;
  padding: 5px;
  border-radius: 22px;
  /* box-shadow: 0px 0px 4px 4px rgba(234, 232, 242, 0.8); */
}
.dark-card {
  background-color: red;
}
</style>
