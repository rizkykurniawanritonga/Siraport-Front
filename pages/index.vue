<template>
  <div class="text-center text-muted mt-4 mb-5">
    <h4>SIRAPORT</h4>
    <p>Sistem Informasi Realiasi Anggaran pada OPD Biro Umum - Real Time.</p>
  </div>

  <div class="row">
    <a class="col-md-4 mx-auto" v-for="(dt, i) in carddata" :href="dt.link">
      <div class="card">
        <div class="card-body">
          <h5 class="text-primary">0{{ i + 1 }}.</h5>
          <h5 class="font-size-16 text-uppercase mt-3">
            {{ dt.title }}
          </h5>
          <p class="text-muted mb-0">
            {{ dt.desc }}
          </p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  head: {
    title: "SIRAPORT",
  },
  data() {
    return {
      carddata: [
        { title: "Login", link: "/login", desc: "Login ke aplikasi." },
      ],
    };
  },
  mounted() {
    flashNotifikasi();
  },
};
definePageMeta({
  layout: "auth",
  middleware: ["haslogin"],
});
</script>
