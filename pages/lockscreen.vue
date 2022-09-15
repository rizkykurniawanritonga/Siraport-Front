<template>
  <div>
    <div class="card col-md-5 mx-auto text-center">
      <div class="card-body p-4">
        <div class="text-center mt-2">
          <h5>Aplikasi terkunci</h5>
          <p class="text-muted">
            Siraport mengunci akses dikarenakan tidak ada aktivitas.
          </p>
        </div>
        <div class="p-2 mt-4">
          <div class="user-thumb mb-4">
            <img
              src="assets/images/users/avatar-3.jpg"
              class="rounded-circle img-thumbnail avatar-lg mx-auto"
              alt="thumbnail"
            />
            <h5 class="font-size-15 mt-3">{{ user && user.nama }}</h5>
          </div>
          <form method="post" action="" @submit.prevent="loginBackyeah">
            <div class="mb-3">
              <label class="form-label" for="userpassword">Password</label>
              <div
                class="position-relative auth-pass-inputgroup input-custom-icon"
              >
                <span class="bx bx-lock-alt"></span>
                <input
                  type="password"
                  class="form-control"
                  id="password-input"
                  placeholder="Enter password"
                  v-model="inputPass"
                  required
                />
              </div>
            </div>

            <div class="mt-4">
              <button
                class="btn btn-soft-success waves-effect waves-light w-100"
                type="submit"
              >
                Unlock
              </button>
            </div>
          </form>

          <div class="mt-4 text-center">
            <p class="mb-0">
              Bukan anda ? coba
              <NuxtLink to="/auth/logout" class="fw-medium text-success"
                >login</NuxtLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async setup() {
    const user = await getUser();
    const loginBack = await storeData("get", { key: "lockLoginBack" });
    return { user, loginBack };
  },
  data() {
    return {
      inputPass: "",
    };
  },
  head: {
    title: "Lock Screen",
  },
  methods: {
    loginBackyeah() {
      if (this.inputPass == this.user.rememberPass) {
        notifikasi("loading", "Mengarahkan anda kembali...");
        return navigateTo(
          { path: this.loginBack || "/dashboard" },
          { replace: true }
        );
      } else {
        notifikasi("error", "Password anda salah!");
      }
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
