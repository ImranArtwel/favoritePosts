import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import PostsComponent from "./components/PostsComponent";
import FavoritePostsComponent from "./components/FavoritePostsComponent";
import PostFormComponent from "./components/PostFormComponent";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.component(
  "post-search",
  require("./components/PostSearchComponent.vue").default
);
Vue.component(
  "search-input",
  require("./components/InputComponent.vue").default
);
Vue.component(
  "post-footer",
  require("./components/PostFooterComponent.vue").default
);
Vue.component("posts", require("./components/PostsComponent.vue").default);
Vue.component(
  "favoriteposts",
  require("./components/FavoritePostsComponent.vue").default
);
Vue.component(
  "postform",
  require("./components/PostFormComponent.vue").default
);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: PostsComponent,
    },
    {
      path: "/posts/favorite",
      name: "favorite",
      component: FavoritePostsComponent,
    },
    {
      path: "/posts/favorite/create-edit",
      name: "create",
      component: PostFormComponent,
    },
  ],
});

const store = new Vuex.Store({
  state: {
    posts: [],
    favoritePosts: [],
    selectedPost: {},
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setFavoritePosts(state, posts) {
      state.favoritePosts = posts;
    },
    setPost(state, post) {
      state.selectedPost = post;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
