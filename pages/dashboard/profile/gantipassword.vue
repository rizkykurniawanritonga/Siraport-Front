<script>
export default {
  data() {
    return {
      newpass: "",
      repeatnewpass: "",
    };
  },
  methods: {
    async updatePassword() {
      if (this.newpass == this.repeatnewpass) {
        this.loadingbtn = true;
        const efs = await apiKoneksi(
          `/user/updateUser/${getUser("id")}`,
          {
            body: {
              nama: getUser("nama"),
              username: getUser("username"),
              password: this.newpass,
            },
          },
          "PUT"
        );
        if (efs.result == "success") {
          const rsp = efs;
          notifikasi(rsp.result, rsp.title);
          navigateTo("/dashboard/profile");
        } else {
          console.log(Audt);
        }
      } else {
        notifikasi("error", "Password baru dan Ulangi Password tidak sama!");
      }
    },
  },
  mounted() {
    this.$emit("judul", "Ganti Password");
  },
  head: {
    title: "Ganti Password",
  },
};
definePageMeta({
  layout: "dash",
  middleware: ["autentikasi"],
});
</script>
<template>
  <div class="card col-xl-4 mx-auto">
    <div class="card-header bg-transparent border-bottom text-uppercase">
      Ganti Password
    </div>
    <div class="card-body">
      <p class="card-text">
        Ganti password dengan kombinasi huruf dan angka, sehingga meningkatkan
        keamanan akun.
      </p>
      <div class="mb-4">
        <label class="form-label" for="new-pass-input">Password Baru</label>
        <input
          class="form-control"
          type="password"
          id="new-pass-input"
          v-model="newpass"
        />
      </div>
      <div class="mb-2">
        <label class="form-label" for="repeat-pass-input"
          >Ulang Password Baru</label
        >
        <input
          class="form-control"
          type="password"
          id="repeat-pass-input"
          v-model="repeatnewpass"
        />
      </div>
    </div>
    <div class="card-footer bg-transparent border-top text-right">
      <nuxt-link
        to="/dashboard/profile"
        class="btn btn-secondary waves-effect waves-light me-2"
        >Batal</nuxt-link
      >
      <button
        href="javascript: void(0);"
        class="btn btn-primary waves-effect waves-light"
        @click="updatePassword"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-show="loadingbtn"
        ></span>
        <span v-show="!loadingbtn">Simpan</span>
      </button>
    </div>
  </div>
</template>
