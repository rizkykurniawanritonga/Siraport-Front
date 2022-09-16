<template>
  <div id="layout-wrapper" class="scroll-smooth">
    <DashHeader
      :sidebar="stateSdbr"
      :judul="judulatas"
      @headerSearch="(i) => (headerSearch = i)"
      @togglesidebar="toggleSidebar()"
    />
    <DashSidebar :sidebar="stateSdbr" @togglesidebar="toggleSidebar()" />
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <NuxtChild
            @judul="(i) => (judulatas = i)"
            class="animate__animated animate__faster animate__fadeIn"
            :headerSearch="headerSearch"
          />
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
import { useWindowSize, useToggle, useIdle } from "@vueuse/core";
export default {
  async setup() {
    const confApp = useAppConfig();
    const curpath = useRoute().fullPath;
    const [{ width: widthlyr }, [stateSdbr, toggleState]] = await Promise.all([
      useWindowSize(),
      useToggle(),
    ]);
    const now = useTimestamp();
    const { idle, lastActive } = useIdle(confApp.idleTime);
    return {
      widthlyr,
      stateSdbr,
      toggleState,
      idle,
      lastActive,
      now,
      curpath,
    };
  },
  data() {
    return {
      judulatas: "",
      headerSearch: "",
      sdbrSize: "sm",
      fcsbck: focusBack(),
      idleState: false,
    };
  },
  computed: {
    waktuidle() {
      return Math.floor((this.now - this.lastActive) / 1000);
    },
  },
  watch: {
    idle(vl) {
      if (vl) {
        storeData("set", { key: "lockLoginBack", val: this.curpath });
        return navigateTo(
          {
            path: "/lockscreen",
          },
          { replace: true }
        );
      }
    },
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
