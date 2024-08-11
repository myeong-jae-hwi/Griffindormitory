<template>
  <div :class="['alart-list', customClass]" @click="handleClick">
    <slot></slot>
    <div class='right' v-if="hasMateClass">
      <button @click="firstButtonAction">수락</button>
      <button @click="secondButtonAction">거절</button>
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
  padding-left: 20px;
  border-radius: 22px;
  box-shadow: 4px 4px 0px 0px #f0f0f0d7;
}

.right{
  float: right;
}

button {
  outline: 0;
  background: #5c78e5;
  width: 55px;
  height: 30px;
  border: 0;
  padding: 8px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  border-radius: 8px;
  cursor: pointer;
  margin: 3px;
}

</style>
