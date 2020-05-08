<template>
  <div class="container postForm">
    <form>
      <div class="form-group">
        <input
          v-model="title"
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter title"
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="body"
          class="form-control"
          id="body"
          rows="3"
          placeholder="Write content here"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="createPost">Save</button>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      title: "",
      body: "",
      editing: false
    };
  },
  computed: {
    selectedPost() {
      return this.$store.state.selectedPost;
    }
  },
  methods: {
    async createPost() {
      if (this.editing) this.updatePost();
      else {
        const response = await axios.post(
          "http://localhost:5000/posts/favorite",
          {
            userId: 50,
            title: this.title,
            body: this.body
          }
        );
        this.title = "";
        this.body = "";
        this.$store.commit("setFavoritePosts", response.data);
        window.location.href = "/";
      }
    },
    async updatePost() {
      let post = this.selectedPost;
      console.log(post);
      const response = await axios.post(
        "http://localhost:5000/posts/favorite/update",
        {
          id: this.selectedPost._id,
          body: this.body,
          title: this.title
        }
      );
      this.$store.commit("setFavoritePosts", response.data);
      window.location.href = "/posts/favorite";
    }
  },
  created() {
    this.title = this.selectedPost.title;
    this.body = this.selectedPost.body;
    this.editing = this.title != "" ? true : false;
  },
  mounted() {}
};
</script>
<style>
.postForm {
  padding: 50px;
}
</style>

