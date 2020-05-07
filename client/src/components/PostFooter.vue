<template>
  <div class="postfooter">
    <div class="favorite">
      <span>
        <a href="#">
          <i class="fa fa-heart-o"></i>
        </a>
      </span>
      <span>
        <a href="#">
          <i class="fa fa-comment" aria-hidden="true"></i>
        </a>
      </span>
    </div>
    <div class="actions" v-if="this.$parent.$options.name != 'posts'">
      <a href="/post/favorite/edit" class="btn btn-primary">
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </a>
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
      default: () => {},
    },
    postIndex: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    favoritePosts() {
      return this.$store.state.favoritePosts;
    },
  },
  methods: {
    async deletePost() {
      console.log(this.$parent.$options.name);
      this.$delete(this.favoritePosts, this.postIndex);
      await axios.delete("http://localhost:5000/posts/favorite", {
        params: {
          id: this.post._id,
        },
      });
    },
  },
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
