<script>
import _ from "lodash";
import { useTimeAgo } from "@vueuse/core";
export default {
  data() {
    return {
      data: null,
      dataFocus: null,
      showModaldelete: false,
      showModalrestore: false,
      loadingbtn: false,
      hdrtbl: ["No", "Nama", "Status", "Dibuat", "Action"],
    };
  },
  computed: {
    resultQuery() {
      if (this.data) {
        return this.data.filter((item) => {
          return this.headerSearch
            .toLowerCase()
            .split(" ")
            .every((v) => item.nama.toLowerCase().includes(v));
        });
      } else {
        return this.data;
      }
    },
  },
  methods: {
    resetfield() {
      this.getData();
      this.dataFocus = null;
    },
    async getData() {
      const Audt = await apiKoneksi("/user/listDeletedUser");
      if (Audt.result == "success") {
        this.$emit("judul", "Deleted Users");
        const rsp = Audt;
        this.data = rsp.data.reverse();
      } else {
        console.log(Audt);
      }
    },
    async restoreUser() {
      this.loadingbtn = true;
      const efh = await apiKoneksi(
        `/user/restoreUser/${this.dataFocus}`,
        {},
        "PUT"
      );
      const rsp = efh;
      if (efh.result == "success") {
        this.resetfield();
        this.showModalrestore = false;
      } else {
        this.loadingbtn = false;
        console.log(efh);
      }
      notifikasi(rsp.result, rsp.title);
    },
    async hapusUser() {
      this.loadingbtn = true;
      const efh = await apiKoneksi(
        `/user/forcedDeleteUser/${this.dataFocus}`,
        {},
        "PUT"
      );
      const rsp = efh;
      if (efh.result == "success") {
        this.resetfield();
        this.showModaldelete = false;
      } else {
        this.loadingbtn = false;
        console.log(efh);
      }
      notifikasi(rsp.result, rsp.title);
    },
  },
  mounted() {
    this.getData();
  },
  head: {
    title: "Deleted Users",
  },
  props: {
    headerSearch: String,
  },
};
definePageMeta({
  layout: "dash",
});
</script>
<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <NuxtLink to="/dashboard/pengguna"
              ><i
                class="bx bx-left-arrow-alt text-3xl align-middle text-black mr-4"
              ></i
            ></NuxtLink>
            <h4 class="card-title mb-0 flex-grow-1 text-danger">
              Data Deleted Users
            </h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <div class="table-responsive rounded border border-gray-300">
              <table
                class="table table-bordered border-gray-300 m-0"
                ref="tabelsumber"
              >
                <thead class="table-light">
                  <tr>
                    <th class="font-bold" v-for="dt in hdrtbl">{{ dt }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dtu, i) in resultQuery">
                    <td class="align-middle">{{ i + 1 }}.</td>
                    <td class="align-middle">
                      {{ dtu.nama }} <b>@{{ dtu.username }}</b> ({{
                        dtu.tipe || "Pengguna"
                      }})
                    </td>
                    <td class="align-middle">
                      <span
                        class="font-semibold"
                        :class="dtu.active ? 'text-success' : 'text-danger'"
                        >{{ dtu.active ? "Aktif" : "Non-aktif" }}</span
                      >
                    </td>
                    <td class="align-middle">
                      {{ useTimeAgo(dtu.created_at).value }}
                    </td>
                    <td>
                      <div
                        class="btn-toolbar gap-2"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                      >
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="First group"
                        >
                          <button
                            type="button"
                            class="btn btn-soft-primary"
                            @click="
                              (dataFocus = dtu.id), (showModalrestore = true)
                            "
                          >
                            <i class="bx bx-rotate-left align-middle"></i>
                            Aktifkan
                          </button>
                        </div>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Third group"
                        >
                          <button
                            type="button"
                            class="btn btn-soft-danger"
                            @click="
                              (dataFocus = dtu.id), (showModaldelete = true)
                            "
                          >
                            <i class="bx bx-edit align-middle"></i> Hapus
                            Selamanya
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <Modal :show="showModalrestore" @tutup="showModalrestore = false">
      <template #content
        ><div class="sm:flex sm:items-start">
          <div
            class="mx-3 flex-shrink-0 flex items-center justify-center p-2 rounded-full bg-sky-100"
          >
            <!-- Heroicon name: outline/exclamation -->
            <i class="bx bx-rotate-left text-3xl text-sky-500"></i>
          </div>
          <div class="mt-2 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-semibold text-gray-900"
              id="modal-title"
            >
              Restore User
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <span class="block mb-2"
                  >Anda yakin ingin mengembalikan user ini aktif kembali?</span
                >
              </p>
            </div>
          </div>
        </div></template
      >
      <template #btnadd>
        <button class="btn btn-primary ml-3" @click.prevent="restoreUser">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="loadingbtn"
          ></span>
          <span v-show="!loadingbtn">Restore</span>
        </button>
      </template>
    </Modal>
    <Modal :show="showModaldelete" @tutup="showModaldelete = false">
      <template #content
        ><div class="sm:flex sm:items-start">
          <div
            class="mx-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-2 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-semibold text-gray-900"
              id="modal-title"
            >
              Hapus User
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <span class="block mb-2"
                  >Anda yakin ingin menghapus user ini selamanya?</span
                >
              </p>
            </div>
          </div>
        </div></template
      >
      <template #btnadd>
        <button class="btn btn-danger ml-3" @click.prevent="hapusUser">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="loadingbtn"
          ></span>
          <span v-show="!loadingbtn">Hapus</span>
        </button>
      </template>
    </Modal>
  </div>
</template>
