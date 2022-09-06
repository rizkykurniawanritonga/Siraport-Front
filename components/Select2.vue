<template>
  <Link
    href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/base.min.css"
    rel="stylesheet"
  />
  <Link
    href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"
    rel="stylesheet"
  />
  <Script
    src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"
  />
  <select class="!mb-0" ref="seltek" name="state" v-model="pilih">
    <slot />
  </select>
</template>
<script>
export default {
  data() {
    return {
      pilih: "",
    };
  },
  watch: {
    pilih(vl) {
      console.log(vl);
    },
  },
  mounted() {
    setTimeout(() => {
      new Choices(this.$refs.seltek);
    }, 500);
  },
};
</script>
