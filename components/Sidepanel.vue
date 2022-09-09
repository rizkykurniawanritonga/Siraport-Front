<template>
  <div
    class="offcanvas 2xl:!w-1/4 !border-l-0 shadow-lg !z-50"
    :class="[clsadd, `offcanvas-${pos}`]"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
    ref="sidepanel"
  >
    <div class="offcanvas-header bg-success border-b border-green-500">
      <h5
        class="offcanvas-title 2xl:!text-lg !text-base text-white"
        id="offcanvasWithBothOptionsLabel"
      >
        <slot name="title" />
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        @click="this.$emit('tutup')"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot name="content" />
    </div>
  </div>
  <div
    class="offcanvas-backdrop !z-30 fade"
    :class="show ? 'show' : 'hidden'"
  ></div>
</template>
<script>
import { onClickOutside } from "@vueuse/core";
export default {
  data() {
    return {
      clsadd: "",
    };
  },
  props: {
    show: Boolean,
    pos: {
      type: String,
      default: "start",
    },
    clickOutside: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show(vl) {
      if (vl) {
        this.clsadd = "showing";
        setTimeout(() => {
          this.clsadd = "show";
        }, 300);
      } else {
        this.clsadd = "show hiding";
        setTimeout(() => {
          this.clsadd = "";
        }, 300);
      }
    },
  },
  mounted() {
    this.clickOutside &&
      onClickOutside(this.$refs.sidepanel, (event) => {
        this.$emit("tutup");
      });
  },
};
</script>
