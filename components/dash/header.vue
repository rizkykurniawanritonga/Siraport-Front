<script>
import { useWindowScroll } from "@vueuse/core";
export default {
  async setup() {
    const { y: yScreen } = useWindowScroll();
    const tahunKerja = await getTahun();
    const user = await getUser();
    return { yScreen, user, tahunKerja };
  },
  data() {
    return {
      searchin: "",
    };
  },
  props: {
    sidebar: Boolean,
    judul: String,
  },
  watch: {
    searchin(vl) {
      this.$emit("headerSearch", vl);
    },
  },
  methods: {
    pickTahunKerja() {
      storeData("set", { key: "pickYearBack", val: useRoute().fullPath });
      navigateTo("/pilihtahun");
    },
    toggleSidebar() {
      this.$emit("togglesidebar");
    },
  },
  mounted() {},
};
</script>
<template>
  <header
    id="page-topbar"
    class="isvertical-topbar !bg-slate-50/50 backdrop-blur backdrop-grayscale !z-20"
    :class="yScreen > 2 && 'border-b border-gray-300 shadow-lg'"
  >
    <div
      class="navbar-header animate__animated animate__faster animate__fadeInDown"
    >
      <div class="flex content-center">
        <!-- LOGO -->
        <div class="navbar-brand-box px-0 d-lg-none d-flex align-items-center">
          <NuxtLink to="/dashboard" class="logo flex">
            <span class="logo-sm !mb-0 flex gap-3 items-center">
              <img
                src="~/assets/images/logopemprovsu.png"
                alt=""
                class="w-10"
              />
            </span>
            <span class="logo-lg my-3 flex gap-3 items-center">
              <img
                src="~/assets/images/logopemprovsu.png"
                alt=""
                class="w-10"
              />
              <span class="text-xl font-extrabold text-black">SIRAPORT</span>
            </span>
          </NuxtLink>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn"
          @click.prevent="toggleSidebar"
        >
          <i class="bx bx-menu align-middle"></i>
        </button>

        <!-- start page title -->
        <div class="page-title-box align-self-center d-none d-md-block">
          <!-- shimmer -->
          <h4 class="page-title mb-0">
            {{ judul }}
          </h4>
        </div>
        <!-- end page title -->
      </div>
      <div
        class="input-group flex-1 md:flex-none md:mx-auto md:!w-1/3 lg:!w-1/4"
      >
        <div class="input-group-text !bg-white !rounded-l-full !pl-5 !pr-0">
          <i class="bx bx-search text-xl"></i>
        </div>
        <input
          type="search"
          name="katakuncipencarian"
          class="form-control !border-l-0 !rounded-r-full"
          placeholder="Kata kunci..."
          autocomplete="off"
          v-model="searchin"
        />
      </div>
      <div class="d-flex items-center">
        <button
          type="button"
          class="btn lg:!bg-slate-200/80 lg:hover:!bg-slate-300/80 lg:!px-4 lg:mr-4 !rounded-full h-fit noti-icon"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          @click="pickTahunKerja"
        >
          <i class="bx bx-calendar-event icon-sm align-middle"></i>
          <span class="align-middle ml-2 lg:inline-block hidden">{{
            tahunKerja
          }}</span>
        </button>
        <Dropdown
          btnclass="header-item noti-icon"
          dropclass="dropdown-menu-xl end-0 p-0"
        >
          <template #btntxt>
            <i class="bx bx-bell icon-sm align-middle"></i>
            <span class="noti-dot bg-danger rounded-pill">4</span>
          </template>
          <template #dropcontent>
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="m-0 font-size-15">Notifications</h5>
                </div>
                <div class="col-auto">
                  <a
                    href="#!"
                    class="small fw-semibold text-decoration-underline"
                  >
                    Mark all as read</a
                  >
                </div>
              </div>
            </div>
            <div data-simplebar style="max-height: 250px">
              <a href="#!" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src="~/assets/images/users/avatar-3.jpg"
                      class="rounded-circle avatar-sm"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <p class="text-muted font-size-13 mb-0 float-end">
                      1 hour ago
                    </p>
                    <h6 class="mb-1">James Lemire</h6>
                    <div>
                      <p class="mb-0">It will seem like simplified English.</p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="#!" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 avatar-sm me-3">
                    <span
                      class="avatar-title bg-primary rounded-circle font-size-18"
                    >
                      <i class="bx bx-cart"></i>
                    </span>
                  </div>
                  <div class="flex-grow-1">
                    <p class="text-muted font-size-13 mb-0 float-end">
                      3 min ago
                    </p>
                    <h6 class="mb-1">Your order is placed</h6>
                    <div>
                      <p class="mb-0">
                        If several languages coalesce the grammar
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="p-2 border-top d-grid">
              <a
                class="btn btn-sm btn-link font-size-14 btn-block text-center"
                href="javascript:void(0)"
              >
                <i class="uil-arrow-circle-right me-1"></i>
                <span>View More..</span>
              </a>
            </div>
          </template>
        </Dropdown>

        <Dropdown
          btnclass="header-item user text-start d-flex align-items-center"
          dropclass="end-0 p-0"
        >
          <template #btntxt>
            <img
              class="rounded-circle header-profile-user"
              src="~/assets/images/users/avatar-3.jpg"
              :alt="user && user.nama"
            />
            <span
              class="d-none d-xl-inline-block ms-2 font-semibold font-size-15"
              >{{ user && user.nama }}</span
            >
          </template>
          <template #dropcontent>
            <div class="p-3 border-bottom">
              <h6 class="mb-0">{{ user && user.nama }}</h6>
              <p class="mb-0 font-size-11 text-muted">
                {{ user && user.username }}
              </p>
            </div>
            <nuxt-link class="dropdown-item" to="/dashboard/profile"
              ><i
                class="mdi mdi-account-circle text-muted font-size-16 align-middle me-2"
              ></i>
              <span class="align-middle">Profile</span></nuxt-link
            >
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click.prevent="logoutAplikasi()"
              ><i
                class="mdi mdi-logout text-muted font-size-16 align-middle me-2"
              ></i>
              <span class="align-middle">Logout</span></a
            >
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>
