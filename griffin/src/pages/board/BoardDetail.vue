<template>
  <div>

    <base-card class="horizental">
      <div class="vertical">
        <h2>{{ title }}</h2>
        <p id="time">{{ utcToKor }}</p>
      </div>
      <p>{{ content }}</p>

    </base-card>
    <section class="comment-section">
      <input
        type="text"
        v-model="newComment"
        class="comment-input"
        placeholder="댓글을 입력하세요."
      />
      <base-btn @click="submitComment" class="comment-btn">입력</base-btn>
    </section>
    <section class="comments">
      <base-card v-if="comments.length" class="comments_container">
        <ul>
          <board-comments
            v-for="(comment, index) in comments"
            :key="index"
            :text="comment.text"
            :time="comment.time"
          />
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import BoardComments from "../../components/board/BoardComments.vue";

export default {
  components: {
    BoardComments,
  },

  props: ["id", "name", "title", "content", "time"],
  data() {
    return {
      newComment: "",
      comments: [],
    };
  },
  computed: {

    ...mapGetters("boards", ["boards"]),
    utcToKor() {
      return moment.utc(this.time).local().format("YYYY-MM-DD HH:mm:ss");
    },

  },
  methods: {
    formatTime(time) {
      return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
    },
    async submitComment() {
      if (this.newComment.trim() === "") return;
      const commentText = this.newComment.trim();

      try {
        await this.$store.dispatch("boards/addComment", {
          boardId: this.id,
          comment: commentText,
        });
        this.comments.push({
          text: commentText,
          time: new Date().toISOString(),
        });
        this.newComment = "";
      } catch (error) {
        console.error("Error adding comment:", error.message);
      }
    },
    async fetchComments() {
      await this.$store.dispatch("boards/fetchInitialData", this.id);
      const board = this.boards.find((board) => board.id === this.id);
      this.comments = board.comments;
    },
  },
  created() {
    this.fetchComments();
  },
};
</script>

<style scoped>
h4 {
  margin: 10px;
  margin-bottom: 0;
}

p {
  margin: 10px;
  font-size: 16px;
  line-height: 1.5;
}
.horizental {
  display: block !important;
  padding: 10px 20px;
}

.vertical {
  display: flex;
  align-items: flex-end;
}

#time{
  display: inline-block;
  font-size: 15px;
  margin: 20px 10px;
}

.comment-section {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.comment-input {
  flex: 5;
  padding: 12px;
  border: none;
  font-size: 14px;
  border-radius: 10px 0 0 10px;
}

.comment-btn {
  flex: 1;
  min-width: 60px;
  border-radius: 0 8px 8px 0;
  background-color: #c4babc;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.comments_container{
  
}
</style>
