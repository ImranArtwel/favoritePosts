<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="page-header" style="margin-bottom:5px;">
          <h3>Favourite Posts</h3>
        </div>
        <span class="btn btn-primary" style="margin-bottom:10px;">
          <router-link to="/posts/favorite/create-edit" class="routerlink" style="color:#fff;">
            <i class="fa fa-plus" aria-hidden="true" style="padding-right:3px;"></i>Create New Post
          </router-link>
        </span>

        <div v-if="filteredPosts.length <= 0">
          <p>You have no favorite posts</p>
        </div>
        <div v-for="(post, index) in filteredPosts" :key="post.id">
          <div class="card post">
            <div class="card-header">
              <span class="post-title">{{ post.title }}</span>
            </div>

            <div class="card-body">{{ post.body }}</div>
          </div>
          <post-footer :post="post" :postIndex="index"></post-footer>
          <hr />
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
      return this.$store.state.favoritePosts.map(post => ({
        ...post,
        isFavorite: true
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
