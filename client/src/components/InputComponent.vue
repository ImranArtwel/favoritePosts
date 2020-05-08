<template>
  <div>
    <input
      type="text"
      name="search"
      autocomplete="off"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
