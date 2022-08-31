<template>
  <p>reset data...</p>
</template>
<script>
export default {
  mounted() {
    storeData("destroy");
    navigateTo("/login", { replace: true });
  },
};
</script>
