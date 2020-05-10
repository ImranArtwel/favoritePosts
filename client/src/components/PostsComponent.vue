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
            autocomplete="off"
          />
        </div>
        <div v-for="(post, index) in filteredPosts" :key="post.id">
          <div class="card post">
            <div class="card-header">
              <a href="#" class="post-title">{{ post.title }}</a>
            </div>

            <div class="card-body">{{ post.body }}</div>
          </div>
          <post-footer :post="post" :postIndex="index"></post-footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      search: "",
      searchedPosts: []
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts.map(post => ({
        ...post,
        isFavorite: false
      }));
    },
    filteredPosts() {
      if (this.search == "") return this.posts;
      else return this.searchedPosts;
    }
  },
  methods: {
    postSearch() {
      if (this.search != "") {
        this.searchedPosts = this.posts.filter(post =>
          post.title.includes(this.search.toLowerCase())
        );
      }
    }
  }
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
