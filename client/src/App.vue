<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "./components/NavbarComponent.vue";
const axios = require("axios").default;

export default {
  name: "App",
  components: { navbar },

  mounted() {
    axios.get("/posts").then(response => {
      this.$store.commit("setPosts", response.data);
    });
    axios.get("/posts/favorite").then(response => {
      this.$store.commit("setFavoritePosts", response.data);
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
