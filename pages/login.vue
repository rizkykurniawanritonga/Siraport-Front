<template>
  <div class="card col-md-5 mx-auto mt-4">
    <div class="card-body p-4">
      <div class="text-center mt-2">
        <h5>Welcome Back !</h5>
        <p class="text-muted">Sign in to continue to webadmin.</p>
      </div>
      <div class="p-2 mt-4">
        <form @submit.prevent="userLogin">
          <div class="mb-3">
            <label class="form-label" for="username">Username</label>
            <div class="position-relative input-custom-icon">
              <input
                v-model="login.username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter username"
              />
              <span class="bx bx-user"></span>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-none zfloat-end">
              <a
                href="auth-recoverpw.html"
                class="text-muted text-decoration-underline"
                >Forgot password?</a
              >
            </div>
            <label class="form-label" for="password-input">Password</label>
            <div
              class="position-relative auth-pass-inputgroup input-custom-icon"
            >
              <span class="bx bx-lock-alt"></span>
              <input
                v-model="login.password"
                type="password"
                class="form-control"
                id="password-input"
                placeholder="Enter password"
              />
              <button
                type="button"
                class="btn btn-link position-absolute h-100 end-0 top-0"
                id="password-addon"
              >
                <i class="mdi mdi-eye-outline font-size-18 text-muted"></i>
              </button>
            </div>
          </div>

          <div class="form-check py-1">
            <input
              type="checkbox"
              class="form-check-input"
              id="auth-remember-check"
            />
            <label class="form-check-label" for="auth-remember-check"
              >Remember me</label
            >
          </div>

          <div class="mt-3">
            <button
              class="btn btn-primary w-100 waves-effect waves-light"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      notifikasi("loading", "Memproses Autentikasi...");
      await loginAplikasiAuth(this.login.username, this.login.password, this);
    },
  },
  head: {
    title: "Login",
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
