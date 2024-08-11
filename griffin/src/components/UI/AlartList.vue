<template>
  <div :class="['alart-list', customClass]" @click="handleClick">
    <slot></slot>
    <div v-if="hasMateClass">
      <button @click="firstButtonAction">첫 번째 버튼</button>
      <button @click="secondButtonAction">두 번째 버튼</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    hasMateClass() {
      return this.customClass.includes('mate');
    }
  },
};
</script>

<style scoped>
.alart-list {
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
