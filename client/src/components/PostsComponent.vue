<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="page-header">
          <h3>All Posts</h3>
        </div>
        <div>
          <input
            v-model="search"
            @keyup="postSearch"
            type="text"
            name="search"
            placeholder="Search by post title"
          />
        </div>
        <div v-for="(post, index) in filteredPosts" :key="post.id">
          <div class="card post">
            <div class="card-header">
              <a href="/posts/favorite" class="post-title">{{ post.title }}</a>
            </div>

            <div class="card-body">
              {{ post.body }}
            </div>
          </div>
          <post-footer :post="post" :postIndex="index"></post-footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//const axios = require("axios").default;
export default {
  components: {},
  data() {
    return {
      search: "",
      searchedPosts: [],
    };
  },
  // watch: {
  //   search(value) {
  //     console.log(value);
  //   },
  // },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    filteredPosts() {
      if (this.search == "") return this.posts;
      else return this.searchedPosts;
    },
  },
  methods: {
    postSearch() {
      // console.log(this.search);
      // const response = await axios.get("http://localhost:5000/posts/search", {
      //   params: {
      //     key: this.search.toLowerCase(),
      //   },
      // });
      // this.searchedPosts = response.data
      if (this.search != "") {
        this.searchedPosts = this.posts.filter((post) =>
          post.title.includes(this.search.toLowerCase())
        );
      }
    },
  },
};
</script>
<style scoped>
a {
  color: rgba(0, 0, 0, 0.411);
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  cursor: pointer;
  color: black;
}
.post {
  margin-top: 10px;
}
.post-title {
  text-transform: capitalize;
}
.post-footer {
  display: flex;
}
.favorite {
  padding-bottom: 3px;
}
</style>
