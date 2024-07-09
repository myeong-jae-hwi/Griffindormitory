<template>
  <li>
    <h3>{{ name }}</h3>
    <h3>{{ title }}</h3>
    <div>{{ description }}</div>
  </li>
</template>

<script>
export default {
  props: ['id', 'name', 'title', 'description'],
};
</script>
