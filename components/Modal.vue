<template>
  <div
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    :class="open ? 'block' : 'hidden'"
  >
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="tutupmodal"
        :class="
          open1
            ? 'opacity-100 ease-out duration-300'
            : 'opacity-0 ease-in duration-200'
        "
      ></div>
      <div
        class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          class="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
          :class="
            open1
              ? 'opacity-100 translate-y-0 sm:scale-100 ease-out duration-300'
              : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in duration-200'
          "
        >
          <div class="bg-white p-4">
            <slot name="content" />
          </div>
          <div
            class="bg-gray-50 border-t border-gray-300 p-3 sm:flex sm:flex-row-reverse"
          >
            <slot name="btnadd" />
            <button
              type="button"
              @click="tutupmodal"
              class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _ } from "lodash";
export default {
  data() {
    return {
      open: false,
      open1: false,
    };
  },
  props: {
    show: Boolean,
  },
  watch: {
    show(bl) {
      bl ? this.bukamodal() : this.tutupmodal();
    },
  },
  methods: {
    bukamodal() {
      this.open = true;
      _.delay(
        function (e) {
          e.open1 = true;
        },
        100,
        this
      );
    },
    tutupmodal() {
      this.open1 = false;
      _.delay(
        function (e) {
          e.open = false;
          e.$emit("tutup");
        },
        300,
        this
      );
    },
  },
};
</script>
