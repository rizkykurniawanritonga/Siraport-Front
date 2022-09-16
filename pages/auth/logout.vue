<template>
  <div
    class="flex items-center justify-center h-screen animate__animated animate__fadeIn"
  >
    <div class="text-gray-400 text-2xl flex align-middle gap-3 items-center">
      <div
        class="spinner-border text-secondary m-1 spinner-border-sm !border-2"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      logout...
    </div>
  </div>
</template>
<script>
export default {
  created() {
    storeData("destroy");
    setTimeout(() => {
      navigateTo("/login", { replace: true });
    }, 1000);
  },
};
</script>
