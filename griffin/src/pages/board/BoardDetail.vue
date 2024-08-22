<template>
  <div>
    <div class="header">
      <h3>
        <font-awesome-icon icon="chevron-left" @click="goBack" />
      </h3>
      <h3>자유 게시판</h3>
      <h3>
        <font-awesome-icon icon="ellipsis-vertical" />
      </h3>
    </div>
    <base-card class="horizental">
      <div class="vartical">
        <h2>{{ boardTitle }}</h2>
        <div v-if="currentUser.id === boardUid" class="delete-btn-container">
          <!-- <font-awesome-icon icon="pen-to-square" /> -->
          <font-awesome-icon @click="deleteBoard" icon="trash" />
        </div>
      </div>

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
      <base-btn @click="submitComment" class="comment-btn">
        <font-awesome-icon class="go" icon="paper-plane" />
      </base-btn>
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
      return moment.utc(this.boardTime).local().format('MM/DD/ HH:MM');
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
    goBack() {
      this.$router.push('/boardlist');
    },
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
    async createNotificationForPostAuthor(to, from, commentText, fromUid) {
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
      try {
        await this.$store.dispatch('boards/fetchInitialData', this.id);
        const board = this.boards.find((board) => board.id === this.id);
        this.comments = board.comments;
        this.boardTitle = board.title;
        this.boardContents = board.content;
        this.boardTime = board.time;
        this.boardAuthor = board.author;
        this.boardUid = board.userUid;
      } catch {
        window.alert('존재하지 않는 글입니다.');
      }
    },
  },
  created() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  padding-bottom: 0;
}

ul {
  list-style: none;
}

h2 {
  margin: 10px;
  margin-bottom: 0;
  display: inline-block;
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
  color: rgb(89, 89, 89);
}

.go {
  color: #fff;
}

.comment-section {
  /* border: 2px solid rgb(131, 140, 221); */
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  background-color: rgb(239, 238, 244);
  box-shadow: 0px 0px 4px 4px rgba(234, 232, 242, 0.8);
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
  background-color: #6471e5;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
}
.delete-btn-container {
  vertical-align: text-bottom;
  color: #ddd;
  font-size: 14px;
  float: right;
  margin: 15px 10px 10px 10px;
}
</style>
