<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">VuePosts</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="routerlink">Posts</router-link>>
          </li>
          <li class="nav-item">
            <router-link to="/posts/favorite" class="routerlink">Favourite Posts</router-link>>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.routerlink {
  color: #fff;
  text-decoration: none;
}
ul > li {
  padding: 10px;
}
</style>
