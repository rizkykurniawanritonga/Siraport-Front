<template>
  <div id="layout-wrapper" class="scroll-smooth">
    <DashHeader
      :sidebar="stateSdbr"
      :judul="judulatas"
      @togglesidebar="toggleSidebar()"
    />
    <DashSidebar :sidebar="stateSdbr" @togglesidebar="toggleSidebar()" />
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <NuxtChild @judul="(i) => (judulatas = i)" />
        </div>
      </div>
      <DashFooter />
    </div>
  </div>
</template>
<script>
definePageMeta({
  middleware: ["autentikasi"],
});
import { useWindowSize, useToggle } from "@vueuse/core";
export default {
  async setup() {
    const { width, height } = useWindowSize();
    const [stateSdbr, toggleState] = useToggle();
    const widthlyr = width;
    return { widthlyr, stateSdbr, toggleState };
  },
  data() {
    return {
      judulatas: null,
      sdbrSize: "sm",
      fcsbck: focusBack(),
    };
  },
  watch: {
    fcsbck(current, previous) {
      if (current === "visible" && previous === "hidden") {
        notifikasi("info", "Yuk semangat kerjanya! 😊");
      }
    },
    widthlyr(vs) {
      if (vs >= 992) {
        this.sdbrSize = "lg";
      } else if (vs >= 768 && vs < 992) {
        this.sdbrSize = "md";
      } else {
        this.sdbrSize = "lg";
      }
      document.body.setAttribute("data-sidebar-size", this.sdbrSize);
    },
    stateSdbr(vl) {
      document.body.classList[vl ? "add" : "remove"]("sidebar-enable");
    },
  },
  methods: {
    toggleSidebar() {
      if (this.stateSdbr && this.sdbrSize == "sm" && this.widthlyr >= 992) {
        document.body.setAttribute("data-sidebar-size", "lg");
      } else if (!this.stateSdbr && this.widthlyr >= 992) {
        document.body.setAttribute("data-sidebar-size", "sm");
      }
      this.toggleState();
    },
  },
};
</script>
