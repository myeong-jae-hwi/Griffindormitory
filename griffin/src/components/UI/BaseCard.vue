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
  margin: 20px 0 20px 0;
  padding: 5px;
  border-radius: 22px;
  box-shadow: 4px 4px 0px 0px rgba(209, 205, 205, 0.843);
}
.dark-card {
  background-color: red;
}
</style>
