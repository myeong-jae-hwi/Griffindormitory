<template>
  <div class="vartical">
    <section class="">
      <input type="text" v-model="subject" placeholder="과목명" />
    </section>
    <select v-model="grade">
      <option value="A+">A+</option>
      <option value="A0">A0</option>
      <option value="B+">B+</option>
      <option value="B0">B0</option>
      <option value="C+">C+</option>
      <option value="C0">C0</option>
      <option value="D+">D+</option>
      <option value="D0">D0</option>
      <option value="F">F</option>
      <option value="P">P</option>
      <option value="NP">NP</option>
    </select>
    <button @click="$emit('remove')">삭제</button>
  </div>
</template>

<script>

export default {
  props: ['initialSubject', 'initialGrade'],
  data() {
    return {
      subject: this.initialSubject || '',
      grade: this.initialGrade || 'A+'
    };
  },
  watch: {
    subject(newSubject) {
      this.$emit('update-subject', newSubject);
    },
    grade(newGrade) {
      this.$emit('update-grade', newGrade);
    }
  }
};
</script>

<style scoped>
.vartical {
  vertical-align: middle;
  display: table-cell;
}
</style>
