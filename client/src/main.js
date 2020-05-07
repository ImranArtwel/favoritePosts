import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import PostsComponent from "./components/PostsComponent";
import FavoritePostsComponent from "./components/FavoritePostsComponent";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.component("post-search", require("./components/PostSearch.vue").default);
Vue.component("search-input", require("./components/Input.vue").default);
Vue.component("post-footer", require("./components/PostFooter.vue").default);
Vue.component("posts", require("./components/PostsComponent.vue").default);
Vue.component(
  "favoriteposts",
  require("./components/FavoritePostsComponent.vue").default
);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: PostsComponent,
    },
    {
      path: "/posts/favorite",
      component: FavoritePostsComponent,
    },
  ],
});

const store = new Vuex.Store({
  state: {
    posts: [],
    favoritePosts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setFavoritePosts(state, posts) {
      state.favoritePosts = posts;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
