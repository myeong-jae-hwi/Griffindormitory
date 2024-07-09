<!-- InfoPage.vue -->
<template>
  <div>
    <students-license></students-license>
    <board-item
    v-for="board in boards"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        :title="board.title"></board-item>
  </div>
</template>

<script>
import StudentsLicense from '../../components/UI/StudentsLicense.vue';
import BoardItem from '../../components/board/BoardItem.vue';


export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
    BoardItem
  },
  data() {
    return {
      boards: [
        {
          id: 'b1',
          name: 'MJ',
          title: 'This is Board Test',
          description: 'Hello ?',
        },
        {
          id: 'b2',
          name: 'SW',
          title: 'I like Pubao',
          description: 'I miss pubao',
        },
      ],
    };
  },
};
</script>
