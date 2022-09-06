<script>
import { useTimeAgo } from "@vueuse/core";
export default {
  async setup() {
    const user = await getUser();
    return { user };
  },
  mounted() {
    this.$emit("judul", "Profil");
  },
  head: {
    title: "Profil",
  },
};
definePageMeta({
  layout: "dash",
  middleware: ["autentikasi"],
});
</script>
<template>
  <div class="card col-xxl-4">
    <div class="card-body p-0">
      <div class="user-profile-img">
        <img
          src="~/assets/images/logopemprovsu.png"
          class="profile-img profile-foreground-img rounded-top"
          style="height: 120px"
          alt=""
        />
        <div class="overlay-content rounded-top"></div>
      </div>
      <!-- end user-profile-img -->

      <div class="p-4 pt-0">
        <div class="mt-n5 position-relative text-center border-bottom pb-3">
          <img
            src="~/assets/images/users/avatar-3.jpg"
            alt=""
            class="avatar-xl rounded-circle img-thumbnail mx-auto"
          />

          <div class="mt-3">
            <h5 class="mb-1">{{ user && user.nama }}</h5>
          </div>
        </div>

        <div class="table-responsive mt-3 border-bottom pb-3">
          <table
            class="table align-middle table-sm table-nowrap table-borderless table-centered mb-0"
          >
            <tbody>
              <tr>
                <th class="fw-bold">Nama Lengkap :</th>
                <td class="text-muted">{{ user && user.nama }}</td>
              </tr>
              <tr>
                <th class="fw-bold">Username :</th>
                <td class="text-muted font-bold">
                  @{{ user && user.username }}
                </td>
              </tr>
              <tr>
                <th class="fw-bold">Akun dibuat :</th>
                <td class="text-muted">
                  {{ useTimeAgo(user && user.created_at).value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-3 mt-3 d-none">
          <div class="row text-center">
            <div class="col-6 border-end">
              <div class="p-1">
                <h5 class="mb-1">1,269</h5>
                <p class="text-muted mb-0">Products</p>
              </div>
            </div>
            <div class="col-6">
              <div class="p-1">
                <h5 class="mb-1">5.2k</h5>
                <p class="text-muted mb-0">Followers</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-4 flex gap-2 justify-center">
          <nuxt-link
            to="/dashboard/profile/gantipassword"
            class="btn btn-primary waves-effect waves-light btn-sm"
            ><i class="bx bxs-key ms-1 align-middle"></i>&nbsp;&nbsp;Ganti
            Password</nuxt-link
          >
          <button
            @click.prevent="logoutAplikasi()"
            class="btn btn-secondary waves-effect waves-light btn-sm"
          >
            <i class="bx bx-exit ms-1 align-middle"></i>&nbsp;&nbsp;Sign out
          </button>
        </div>

        <div class="mt-3 pt-1 text-center d-none">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                href="javascript:void()"
                class="social-list-item bg-primary text-white border-primary"
              >
                <i class="bx bxl-facebook"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="javascript:void()"
                class="social-list-item bg-info text-white border-info"
              >
                <i class="bx bxl-linkedin"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="javascript:void()"
                class="social-list-item bg-danger text-white border-danger"
              >
                <i class="bx bxl-google"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
