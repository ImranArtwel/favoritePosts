<template>
  <div class="postfooter">
    <div class="favorite">
      <span @click.prevent="updateFavorite">
        <i v-bind:class="[!post.isFavorite ? 'fa fa-heart-o' : 'fa fa-heart']"></i>
      </span>
      <span v-if="this.$parent.$options.name != 'posts'">
        <a href="#">
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
      isFavorite: false
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
    }
  }
};
</script>

<style>
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
