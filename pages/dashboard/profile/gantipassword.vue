<script>
export default {
  async setup() {
    const user = await getUser();
    return { user };
  },
  data() {
    return {
      oldpass: "",
      newpass: "",
      repeatnewpass: "",
    };
  },
  methods: {
    async updatePassword() {
      if (this.user.rememberPass == this.oldpass) {
        if (this.newpass == this.repeatnewpass) {
          this.loadingbtn = true;
          $fetch(`/api/fetch/update?chain=user-updateUser&id=${this.user.id}`, {
            method: "PUT",
            body: {
              nama: this.user.nama,
              username: this.user.username,
              password: this.newpass,
            },
          }).then((upSt) => {
            if (upSt.result == "success") {
              updateUser("rememberPass", this.newpass);
              notifikasi(upSt.result, upSt.title);
              return navigateTo(
                { path: "/dashboard/profile" },
                { replace: true }
              );
            } else {
              console.log(upSt);
            }
          });
        } else {
          notifikasi("error", "Password baru dan Ulangi Password tidak sama!");
        }
      } else {
        notifikasi("error", "Password saat ini salah!");
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
  <div class="card col-xl-4">
    <div class="card-header bg-transparent border-bottom text-uppercase">
      Ganti Password
    </div>
    <div class="card-body">
      <p class="card-text">
        Ganti password dengan kombinasi huruf dan angka, sehingga meningkatkan
        keamanan akun.
      </p>
      <div class="mb-4">
        <label class="form-label" for="old-pass-input">Password saat ini</label>
        <input class="form-control sr-only autocompletefixer" type="password" />
        <input
          class="form-control"
          type="password"
          id="old-pass-input"
          autocomplete="off"
          v-model="oldpass"
        />
      </div>
      <div class="row">
        <div class="mb-4 col-md-6">
          <label class="form-label" for="new-pass-input">Password Baru</label>
          <input
            class="form-control"
            type="password"
            id="new-pass-input"
            v-model="newpass"
          />
        </div>
        <div class="mb-2 col-md-6">
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
