<template>
  <div>
    <div class="text-center text-muted my-5">
      <h4>Pilih Tahun Anggaran</h4>
      <p>Untuk memulai silahkan pilih tahun anggaran yang akan di proses.</p>
    </div>

    <div class="row">
      <div class="col-lg-2" v-for="thn in pickyear" :key="thn">
        <div
          class="card !rounded-full bg-soft-success hover:!bg-green-500 transition-all hover:!text-white animate__animated animate__faster animate__fadeInUp"
          role="button"
          @click.prevent="pilih(thn)"
        >
          <div class="card-body text-center">
            <!-- <h6 class="text-primary">80%</h6> -->
            <span class="text-uppercase m-0 text-2xl font-semibold">{{
              thn
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useDateFormat, useNow } from "@vueuse/core";
import { _ } from "lodash";
export default {
  async setup() {
    const yearBack = await storeData("get", { key: "pickYearBack" });
    const cyr = useDateFormat(useNow(), "YYYY");
    return { yearBack, cyr };
  },
  computed: {
    pickyear() {
      const cyr = _.toNumber(this.cyr) - 4;
      let listYr = [];
      for (let i = 0; i <= 5; i++) {
        listYr.push(_.toNumber(cyr) + i);
      }
      return listYr;
    },
  },
  head: {
    title: "Pilih Tahun Anggaran",
  },
  methods: {
    async pilih(val) {
      setTahun(val);
      notifikasi("info", "Memilih Tahun Anggaran " + val);
      return navigateTo(
        { path: this.yearBack || "/dashboard" },
        { replace: true }
      );
    },
  },
  mounted() {
    flashNotifikasi();
  },
};
definePageMeta({
  layout: "auth",
  middleware: ["autentikasi"],
});
</script>
