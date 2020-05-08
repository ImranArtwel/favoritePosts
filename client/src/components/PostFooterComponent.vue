<template>
  <div>
    <div class="postfooter">
      <div class="favorite">
        <span @click.prevent="updateFavorite">
          <i v-bind:class="[!post.isFavorite ? 'fa fa-heart-o' : 'fa fa-heart']"></i>
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
        <a class="btn btn-danger" @click="deletePost">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div>
      <div v-for="(comment, index) in post.comments" :key="index">
        <h4>Comments</h4>
        <span class="comment" style="text-align:left;">{{ comment.comment }}</span>
      </div>
      <div v-if="isCommenting">
        <textarea
          v-model="comment"
          class="form-control"
          id="comment"
          rows="3"
          placeholder="Write comment here"
        ></textarea>
        <button @click="saveComment" class="btn btn-primary" style="margin-top:5px;">Save Comment</button>
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
      default: () => {}
    },
    postIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      isFavorite: false,
      comment: "",
      isCommenting: false
    };
  },
  computed: {
    favoritePosts() {
      return this.$store.state.favoritePosts;
    }
  },
  methods: {
    async deletePost() {
      this.$delete(this.favoritePosts, this.postIndex);
      await axios.delete("http://localhost:5000/posts/favorite", {
        params: {
          id: this.post._id
        }
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
            body: this.post.body
          })
          .then(response => {
            this.$store.commit("setFavoritePosts", response.data);
          });
        this.$forceUpdate();
      }
    },
    editPost() {
      console.log(this.post);
      this.$store.commit("setPost", this.post);
      this.$router.push("/posts/favorite/create-edit");
    },
    commentPost() {
      this.isCommenting = true;
    },
    saveComment() {
      axios
        .post("http://localhost:5000/posts/favorite/update", {
          id: this.post._id,
          comments: {
            comment: this.comment
          }
        })
        .then(response => {
          this.$store.commit("setFavoritePosts", response.data);
        });
      this.isCommenting = false;
    }
  },
  mounted() {
    //this.comment = this.post.comments[0].comment;
  }
};
</script>

<style>
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
