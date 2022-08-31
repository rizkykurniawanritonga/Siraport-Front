<script>
import _ from "lodash";
import { useTimeAgo } from "@vueuse/core";
export default {
  data() {
    return {
      users: {},
      showModal: false,
      showModaldelete: false,
      modalMode: "add",
      loadingbtn: false,
      data: null,
      dataFocus: null,
      hdrtbl: ["No", "Nama", "Status", "Dibuat", "Action"],
    };
  },
  methods: {
    resetfield() {
      this.showModal = false;
      this.showModaldelete = false;
      this.getData();
      this.users = {};
      this.modalMode = "add";
      this.dataFocus = null;
      this.loadingbtn = false;
    },
    async getData() {
      const Audt = await apiKoneksi("/user/listUser");
      if (Audt.result == "success") {
        const rsp = Audt;
        this.data = rsp.data.reverse();
      } else {
        console.log(Audt);
      }
    },
    async editDialog(val) {
      const usrGt = _.find(this.data, ["id", val]);
      this.dataFocus = val;
      this.users = { nama: usrGt.nama, username: usrGt.username };
      this.modalMode = "edit";
      this.showModal = true;
    },
    async simpanUsers() {
      this.loadingbtn = true;
      const efs = await apiKoneksi(
        "/user/addUser",
        {
          body: {
            nama: this.users.nama,
            username: this.users.username,
            password: this.users.password,
          },
        },
        "POST"
      );
      if (efs.result == "success") {
        const rsp = efs;
        this.resetfield();
        this.showModal = false;
        notifikasi(rsp.result, rsp.title);
      } else {
        console.log(Audt);
      }
    },
    async updateUser() {
      this.loadingbtn = true;
      const efu = await apiKoneksi(
        `/user/updateUser/${this.dataFocus}`,
        {
          body: {
            nama: this.users.nama,
            username: this.users.username,
            password: this.users.password,
          },
        },
        "PUT"
      );
      if (efu.result == "success") {
        const rsp = efu;
        this.resetfield();
        this.showModal = false;
        notifikasi(rsp.result, rsp.title);
      } else {
        console.log(efu);
      }
    },
    async hapusUser() {
      this.loadingbtn = true;
      const efh = await apiKoneksi(
        `/user/deleteUser/${this.dataFocus}`,
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
  watch: {
    showModal(val) {
      if (!val) {
        this.resetfield();
      }
    },
  },
  mounted() {
    this.getData();
    this.$emit("judul", "Users");
  },
  head: {
    title: "Users",
  },
};
definePageMeta({
  layout: "dash",
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header align-items-center d-flex">
          <h4 class="card-title mb-0 flex-grow-1">Data Users</h4>
          <div class="flex-shrink-0">
            <div class="d-flex flex-wrap mb-0 my-n1">
              <div
                class="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <button
                  type="button"
                  class="btn btn-success"
                  @click="showModal = true"
                >
                  Tambah
                </button>

                <Dropdown
                  outerClass="btn-group"
                  btnclass="btn-secondary dropdown-toggle"
                  dropclass="right-0 border"
                >
                  <template #btntxt
                    ><i class="mdi mdi-chevron-down"></i>
                  </template>
                  <template #dropcontent>
                    <NuxtLink
                      class="dropdown-item text-danger"
                      to="/dashboard/pengguna/deleted"
                      >Pengguna Terhapus</NuxtLink
                    >
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="col-md-5 d-flex flex-column px-5 py-3 mb-3">
            <div class="row mb-4">
              <label
                for="horizontal-firstname-input"
                class="col-sm-3 col-form-label"
                >Kata Kunci</label
              >
              <div class="col-sm-9">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Kata kunci pencarian..."
                  id="horizontal-firstname-input"
                />
              </div>
            </div>
          </div>
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
                <tr v-for="(dtu, i) in data">
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
                          @click="editDialog(dtu.id)"
                        >
                          <i class="bx bx-edit align-middle"></i> Edit
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
                          <i class="bx bx-edit align-middle"></i> Delete
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
      <Modal :show="showModal" @tutup="showModal = false">
        <template #content>
          <h3
            class="text-lg leading-6 font-semibold text-gray-900 mb-4"
            id="modal-title"
          >
            {{ modalMode == "add" ? "Tambah" : "Edit" }} Pengguna
          </h3>
          <form>
            <div class="mb-4">
              <label for="formrow-kode-input" class="form-label"
                >Username</label
              >
              <input
                type="text"
                required
                class="form-control"
                v-model="users.username"
                id="formrow-kode-input"
              />
            </div>
            <div class="mb-4">
              <label for="formrow-kode-input" class="form-label"
                >Nama Lengkap</label
              >
              <input
                required
                type="text"
                class="form-control"
                v-model="users.nama"
                id="formrow-kode-input"
              />
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label for="formrow-firstname-input" class="form-label"
                  >Password</label
                >
                <input
                  required
                  type="password"
                  class="form-control"
                  v-model="users.password"
                  id="formrow-kode-input"
                />
              </div>
            </div>
          </form>
        </template>
        <template #btnadd>
          <button
            class="btn btn-success lanim ml-3"
            v-if="modalMode == 'add'"
            @click="simpanUsers"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-show="loadingbtn"
            ></span>
            <span v-show="!loadingbtn">Simpan</span>
          </button>
          <button
            class="btn btn-success lanim ml-3"
            v-else-if="modalMode == 'edit'"
            @click.prevent="updateUser"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-show="loadingbtn"
            ></span>
            <span v-show="!loadingbtn">Update</span>
          </button></template
        >
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
                Hapus User ini?
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <span class="block mb-2"
                    >Anda yakin ingin menghapus user ini?</span
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
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>
