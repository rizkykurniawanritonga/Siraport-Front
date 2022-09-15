<template>
  <div>
    <LoadingBaru />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - SIRAPORT` : "SIRAPORT";
  },
});
</script>
