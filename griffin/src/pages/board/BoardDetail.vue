<template>
  <div>
    <div v-if="currentUser.id === boardUid" class="delete-btn-container">
      <button @click="deleteBoard" class="delete-btn">삭제하기</button>
    </div>
    <base-card class="horizental">
      <h2>{{ boardTitle }}</h2>
      <div class="vertical">
        <p id="author">작성자: {{ boardAuthor }}</p>
        <p id="author">{{ utcToKor }}</p>
      </div>
      <p>{{ boardContents }}</p>
    </base-card>
    <section class="comment-section">
      <input
        type="text"
        v-model="newComment"
        class="comment-input"
        placeholder="댓글을 입력하세요"
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
import moment from 'moment';
import { mapGetters } from 'vuex';
import BoardComments from '../../components/board/BoardComments.vue';

export default {
  components: {
    BoardComments,
  },

  props: ['id', 'name', 'title', 'content', 'time', 'author', 'userUid'],
  data() {
    return {
      newComment: '',
      comments: [],
      boardTitle: this.title,
      boardContents: this.content,
      boardTime: this.time,
      boardAuthor: this.author,
      boardUid: this.userUid,
    };
  },

  computed: {
    ...mapGetters('boards', ['boards']),
    ...mapGetters('users', ['currentUser']),
    utcToKor() {
      return moment.utc(this.boardTime).local().format('YYYY/MM/DD');
    },
    userName() {
      return this.$store.state.users.users[0].name;
    },
    userId() {
      return this.$store.state.users.userID;
    },
    receiveUid() {
      return this.$route.query.userUid;
    },
  },
  methods: {
    formatTime(time) {
      return moment.utc(time).local().format('YYYY/MM/DD');
    },
    async deleteBoard() {
      const confirmation = window.confirm('게시물을 삭제하시겠습니까 ?');
      if (!confirmation) return;
      try {
        await this.$store.dispatch('boards/deleteBoard', this.id);
        alert('게시물을 삭제하셨습니다.');
        this.$router.push('/boardlist');
      } catch (error) {
        console.error('Error deleting board:', error.message);
      }
    },

    async submitComment() {
      if (this.newComment.trim() === '') return;
      const commentText = this.newComment.trim();
      const userName = this.userName;
      const userId = this.id;

      try {
        await this.$store.dispatch('boards/addComment', {
          boardId: this.id,
          comment: commentText,
          userName: userName,
          userId: userId,
        });
        this.comments.push({
          text: commentText,
          userName: userName,
          time: new Date().toISOString(),
          userId: userId,
        });
        this.newComment = '';
        this.createNotificationForPostAuthor(
          this.receiveUid,
          this.userName,
          commentText,
          this.userId,
          this.id
        );
      } catch (error) {
        console.error('Error adding comment:', error.message);
      }
    },
    async createNotificationForPostAuthor(
      to,
      from,
      commentText,
      fromUid
    ) {
      console.log(fromUid);
      if (to != this.userId) {
        try {
          const notification = {
            userId: to,
            message: `댓글이 달렸어요 ${from}: ${commentText}`,
            is_read: false,
            created_at: new Date().toISOString(),
            boardId: fromUid,
          };
          await this.$store.dispatch('notifications/createNotification', {
            uid: to,
            notification: notification,
          });
        } catch (error) {
          console.error('Error creating notification:', error.message);
        }
      }
    },
    async fetchComments() {
      try{
        await this.$store.dispatch('boards/fetchInitialData', this.id);
        const board = this.boards.find((board) => board.id === this.id);
        this.comments = board.comments;
        this.boardTitle = board.title;
        this.boardContents = board.content;
        this.boardTime = board.time;
        this.boardAuthor = board.author;
        this.boardUid = board.userUid;
      }
      catch{
        window.alert('존재하지 않는 글입니다.')
      }
    },
  },
  created() {
    this.fetchComments();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
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
.delete-btn-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
