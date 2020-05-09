<template>
  <div>
    <div class="postfooter">
      <div class="favorite">
        <span @click.prevent="updateFavorite">
          <i
            v-bind:class="[!post.isFavorite ? 'fa fa-heart-o' : 'fa fa-heart']"
          ></i>
        </span>
        <span v-if="this.$parent.$options.name != 'posts'">
          <a @click.prevent="commentPost">
            <i class="fa fa-comment" aria-hidden="true"></i>
          </a>
        </span>
      </div>
      <div class="actions" v-if="this.$parent.$options.name != 'posts'">
        <button class="btn btn-primary" @click.prevent="editPost">
          <i class="fa fa-pencil-square" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" @click="deletePost">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div>
      <h4 v-if="this.$parent.$options.name != 'posts'">Comments</h4>
      <div v-for="(comment, index) in post.comments" :key="index">
        <span class="comment" style="text-align:left;">{{ comment }}</span>
        <div style="margin-bottom: 5px;">
          <button
            class="btn btn-primary"
            @click.prevent="editComment(comment, index)"
          >
            <i class="fa fa-pencil-square" aria-hidden="true"></i>
          </button>
          <button
            class="btn btn-danger"
            @click="deleteComment(index)"
            style="margin-left: 5px;"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div v-if="isCommenting">
        <textarea
          v-model="comment"
          class="form-control"
          id="comment"
          rows="3"
          placeholder="Write comment here"
        ></textarea>
        <button
          @click="saveComment"
          class="btn btn-primary"
          style="margin-top:5px;"
        >
          Save Comment
        </button>
        <button
          @click="cancelComment"
          class="btn btn-secondary"
          style="margin-top:5px;margin-left:5px;"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    postIndex: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      isFavorite: false,
      comment: "",
      isCommenting: false,
      commentEditing: "",
      commentIndex: -1,
    };
  },
  computed: {
    favoritePosts() {
      return this.$store.state.favoritePosts;
    },
  },
  methods: {
    async deletePost() {
      this.$delete(this.favoritePosts, this.postIndex);
      await axios.delete("http://localhost:5000/posts/favorite", {
        params: {
          id: this.post._id,
        },
      });
    },
    updateFavorite() {
      if (this.post.isFavorite) {
        this.deletePost();
      } else {
        this.post.isFavorite = true;
        axios
          .post("http://localhost:5000/posts/favorite", {
            userId: this.post.userId,
            title: this.post.title,
            body: this.post.body,
          })
          .then((response) => {
            this.$store.commit("setFavoritePosts", response.data);
          });
        this.$forceUpdate();
      }
    },
    editPost() {
      this.$emit("editing-post");
      this.$store.commit("setPost", this.post);
      this.$router.push("/posts/favorite/create-edit");
    },
    commentPost() {
      this.isCommenting = true;
    },
    cancelComment() {
      this.isCommenting = false;
    },
    saveComment() {
      let postComments = this.post.comments;
      if (this.commentEditing == true) {
        postComments[this.commentIndex] = this.comment;
      } else postComments.push(this.comment);

      axios
        .post("http://localhost:5000/posts/favorite/update", {
          id: this.post._id,
          comments: postComments,
        })
        .then((response) => {
          this.$store.commit("setFavoritePosts", response.data);
        });

      this.isCommenting = false;
      this.commentEditing = false;
      this.comment = "";
    },

    editComment(comment, index) {
      this.isCommenting = true;
      this.commentEditing = true;
      this.comment = comment;
      this.commentIndex = index;
    },
    deleteComment(index) {
      this.$delete(this.post.comments, index);
      axios
        .post("http://localhost:5000/posts/favorite/update", {
          id: this.post._id,
          comments: this.post.comments,
        })
        .then((response) => {
          this.$store.commit("setFavoritePosts", response.data);
        });
    },
  },
};
</script>

<style>
comment-actions {
  display: flex;
  justify-content: space-evenly;
}
.comment {
  background-color: #ccc;
  padding: 5px;
  margin-bottom: 10px;
}
.footer {
  display: flex;
  flex-direction: column;
}
.postfooter {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.actions {
  display: flex;
  justify-content: space-between;
  width: 100px;
}
.favorite {
  display: flex;
  justify-content: space-between;
  width: 50px;
}
</style>
