<template>
  <!-- ========== Left Sidebar Start =========== -->
  <div
    class="vertical-menu !z-30 animate__animated animate__fadeInLeft animate__faster"
  >
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <NuxtLink to="/dashboard" class="logo">
        <span class="logo-sm mt-4 mb-2.5 flex gap-3 items-center">
          <img src="~/assets/images/logopemprovsu.png" alt="" class="w-10" />
        </span>
        <span class="logo-lg my-3 flex gap-3 items-center">
          <img src="~/assets/images/logopemprovsu.png" alt="" class="w-10" />
          <span class="text-xl font-semibold text-black">SIRAPORT</span>
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

    <div data-simplebar class="sidebar-menu-scroll pt-3">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu" ref="sidemenus">
          <li
            v-for="menu in menus"
            :class="{
              'menu-title': menu.batas,
              disabled: menu.disabled,
              'mm-active': checkTeks(menu.link, useRoute().path),
            }"
          >
            <DashLittleMenuitem
              v-if="!menu.batas"
              :menu="menu"
              @click="!menu.batas && !menu.sub && toggleSidebar"
            />
            <ul
              v-if="!menu.batas && menu.sub"
              class="sub-menu mm-collapse"
              aria-expanded="false"
            >
              <li
                v-for="sub in menu.sub"
                :class="[sub.disabled ? 'disabled' : '']"
              >
                <DashLittleMenuitem :menu="sub" />
                <ul
                  v-if="sub.sub"
                  class="sub-menu mm-collapse"
                  aria-expanded="false"
                >
                  <li
                    v-for="sub1 in sub.sub"
                    :class="[sub1.disabled ? 'disabled' : '']"
                  >
                    <DashLittleMenuitem :menu="sub1" />
                  </li>
                </ul>
              </li>
            </ul>
            <span v-else>{{ menu.batas }}</span>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
  <!-- Left Sidebar End -->
</template>
<script>
import "simplebar";
import MetisMenu from "metismenujs";
export default {
  data() {
    return {
      menus: [
        {
          link: "/dashboard",
          text: "Dashboard",
          icon: "bx bx-home-alt icon nav-icon",
          count: {
            int: 7,
            color: "success",
          },
        },
        { batas: "Data Dasar" },
        {
          link: "/referensi",
          text: "Referensi",
          icon: "bx bx-copy icon nav-icon",
          sub: [
            { text: "Sub Kegiatan", link: "/dashboard/subkegiatan" },
            { text: "Akun", link: "/dashboard/accountref" },
            { text: "Sumber Dana", link: "/dashboard/sumberdana" },
            // {
            //   text: "Standar Harga",
            //   link: "/dashboard/pricestandart",
            //   sub: [
            //     { text: "SSH", link: "/dashboard/pricestandart/SSH" },
            //     { text: "SBU", link: "/dashboard/pricestandart/SBU" },
            //     { text: "HSPK", link: "/dashboard/pricestandart/HSPK" },
            //     { text: "ASB", link: "/dashboard/pricestandart/ASB" },
            //   ],
            // },
          ],
        },
        {
          link: "/dashboard/base",
          text: "Base",
          icon: "bx bx-folder-open icon nav-icon",
        },
        {
          link: "/dashboard/urusan",
          text: "Struktur",
          icon: "bx bx-folder-open icon nav-icon",
        },
        // {
        //   link: "/skpdprofile",
        //   text: "Profile SKPD",
        //   icon: "bx bx-id-card icon nav-icon",
        // },
        // {
        //   link: "/usulharga",
        //   text: "Usulan Standar Harga",
        //   icon: "bx bx-customize icon nav-icon",
        // },
        { batas: "Belanja" },
        {
          link: "/dashboard/belanja",
          text: "Sub Kegiatan Belanja",
          icon: "bx bx-folder-open icon nav-icon",
        },
        // {
        //   link: "/docanggaran",
        //   text: "Dokumen Anggaran",
        //   icon: "bx bxs-food-menu icon nav-icon",
        //   sub: [
        //     {
        //       text: "RKA",
        //       link: "/rka",
        //       sub: [
        //         { text: "SKPD", link: "/rka/skpd" },
        //         { text: "SKPD Pendapatan", link: "/rka/skpdpendapatan" },
        //         { text: "SKPD Belanja", link: "/rka/belanja" },
        //         {
        //           text: "SKPD Rincian Belanja",
        //           link: "/rka/rincianbelanja",
        //         },
        //         { text: "SKPD Pembiayaan", link: "/rka/pembiayaan" },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   link: "/penatausahaan",
        //   text: "Penatausahaan",
        //   icon: "bx bx-id-card icon nav-icon",
        // },
        { batas: "PAGU" },
        {
          link: "/alokasidana",
          text: "Alokasi Dana",
          icon: "bx bx-receipt icon nav-icon",
        },
        { batas: "PROFIL" },
        {
          link: "/dashboard/profile",
          text: "Profil",
          icon: "bx bxs-user-circle icon nav-icon",
        },
        {
          link: "/dashboard/profile/gantipassword",
          text: "Ganti Password",
          icon: "bx bxs-key icon nav-icon",
        },
        { batas: "ADMINISTRATOR" },
        {
          link: "/dashboard/pengguna",
          text: "Users",
          icon: "bx bxs-user-account icon nav-icon",
        },
      ],
    };
  },
  props: {
    sidebar: Boolean,
  },
  mounted() {
    new MetisMenu(this.$refs.sidemenus);
  },
  methods: {
    toggleSidebar() {
      this.$emit("togglesidebar");
    },
  },
};
</script>
