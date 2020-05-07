<template>
  <div>
    <input
      v-model="search"
      @keyup.enter="postSearch"
      type="text"
      name="search"
      placeholder="Search by post title"
      autocomplete="off"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    postSearch() {
      console.log("searching..");
    },
  },
};
</script>
