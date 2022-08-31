<template>
  <div class="dropdown relative d-inline-block" :class="outerClass">
    <button
      type="button"
      class="btn"
      :class="[btnclass, value ? 'show' : '']"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      ref="dropbtn"
      @click="toggle()"
    >
      <slot name="btntxt" />
    </button>
    <div class="dropdown-menu" :class="[dropclass, value ? 'show' : '']">
      <slot name="dropcontent" />
    </div>
  </div>
</template>
<script>
import { onClickOutside, useToggle } from "@vueuse/core";
export default {
  setup() {
    const [value, toggle] = useToggle();
    return { value, toggle };
  },
  props: {
    btnclass: String,
    dropclass: String,
    outerClass: {
      type: String,
      default: "",
    },
  },
  mounted() {
    onClickOutside(this.$refs.dropbtn, (event) => {
      this.value = false;
    });
  },
};
</script>
