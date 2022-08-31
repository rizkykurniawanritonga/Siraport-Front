<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$emit("judul", "Hi, Welcome Back!");
  },
  beforeUnmount() {
    this.$emit("judul", "loading...");
  },
  head: {
    title: "Dashboard",
  },
};
definePageMeta({
  layout: "dash",
  middleware: ["autentikasi"],
});
</script>
<template>
  <h1>Haloo</h1>
</template>
