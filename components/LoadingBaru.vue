<template>
  <div id="loading" />
</template>
<script>
import { onBeforeUnmount } from "vue";
import { useNuxtApp } from "#app";
import NProgress from "nprogress";
export default {
  name: "NprogressLoading",
  setup() {
    let cfg = {
      easing: "ease",
      speed: 500,
      trickleRate: 0.1,
      trickleSpeed: 500,
    };
    NProgress.configure(cfg);
    // Hook to app lifecycle
    // TODO: Use unified loading API
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", NProgress.start);
    nuxtApp.hook("page:finish", NProgress.done);
    onBeforeUnmount(() => NProgress.remove);
  },
};
</script>
