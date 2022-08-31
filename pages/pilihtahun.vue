<template>
  <div class="text-center text-muted my-5">
    <h4>Pilih Tahun Anggaran</h4>
    <p>Untuk memulai silahkan pilih tahun anggaran yang akan di proses.</p>
  </div>

  <div class="row">
    <div class="col-md-3" v-for="thn in tahun" :key="thn">
      <div class="card" role="button" @click.prevent="pilih(thn)">
        <div class="card-body text-center">
          <h6 class="text-primary">80%</h6>
          <h3 class="text-uppercase mt-3">{{ thn }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tahun: [2020, 2021, 2022, 2023],
    };
  },
  head: {
    title: "Pilih Tahun Anggaran",
  },
  methods: {
    pilih(val) {
      setTahun(val);
      notifikasi("info", "Memilih Tahun Anggaran " + val);
      navigateTo("/dashboard");
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
