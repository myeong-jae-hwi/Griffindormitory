<template>
  <section>
    <ul>
      <board-item
        v-for="board in boards"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        :title="board.title"
        :description="board.description"
      ></board-item>
    </ul>
  </section>
</template>

<script>
import BoardItem from '../../components/board/BoardItem.vue';

export default {
  components: {
    BoardItem,
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
