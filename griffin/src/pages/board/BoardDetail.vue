<template>
  <div>
    <base-card class="horizental">
      <h2>{{ title }}</h2>

      <div class="vertical">
        <p id="author">작성자: {{ author }}</p>
        <p id="author">{{ utcToKor }}</p>
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
            :userName="comment.userName"
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

  props: ["id", "name", "title", "content", "time", "author"],
  data() {
    return {
      newComment: "",
      comments: [],
    };
  },
  computed: {
    ...mapGetters("boards", ["boards"]),
    utcToKor() {
      return moment.utc(this.time).local().format("YYYY/MM/DD");
    },
    userName() {
      return this.$store.state.users.users[0].name;
    },
    userId() {
      return this.$store.state.users.userID
    }
  },
  methods: {
    formatTime(time) {
      return moment.utc(time).local().format("YYYY/MM/DD");
    },
    async submitComment() {
      if (this.newComment.trim() === "") return;
      const commentText = this.newComment.trim();
      const userName = this.userName
      const userId = this.userId
      console.log('여기로 왔어요 ㅋㅋ',userId)
      try {
        await this.$store.dispatch("boards/addComment", {
          boardId: this.id,
          comment: commentText,
          userName: userName,
          userId: userId
        });
        this.comments.push({
          text: commentText,
          userName: userName,
          time: new Date().toISOString(),
          userId: userId
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
ul{
  list-style:none;
}

h2 {
  margin: 10px;
  margin-bottom: 0;
}

p {
  margin: 10px;
  font-size: 15px;
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

#author {
  margin: 10px 5px 20px 10px;
  font-size: 13px;
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
</style>
