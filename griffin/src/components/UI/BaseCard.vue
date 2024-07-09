<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
div {
  width: clac(100% - 20px);
  height: 18vh;
  background-color: #fcfcfc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border-radius: 22px;
  box-shadow: 4px 4px 0px 0px #f0f0f0d7;;
}
</style>
