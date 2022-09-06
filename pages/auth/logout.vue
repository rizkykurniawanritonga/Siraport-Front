<template>
  <p>logout...</p>
</template>
<script>
export default {
  created() {
    storeData("destroy");
    navigateTo("/login", { replace: true });
  },
};
</script>
