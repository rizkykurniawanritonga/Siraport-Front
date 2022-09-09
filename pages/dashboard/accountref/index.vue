<script>
import _ from "lodash";
import { useTimeAgo } from "@vueuse/core";
export default {
  async setup() {
    const tahuns = await getTahun();
    const { data: data, refresh: getData } = await useFetch(
      "/api/akun/readAkun"
    );
    return { data, getData };
  },
  data() {
    return {
      akun: {},
      showModal: false,
      showModaldelete: false,
      modalMode: "add",
      loadingbtn: false,
      dataFocus: null,
      hdrtbl: [
        "No",
        "Kode Rekening",
        "Nama Rekening",
        "Status",
        "Dibuat",
        "Action",
      ],
    };
  },
  methods: {
    resetfield() {
      this.showModal = false;
      this.showModaldelete = false;
      this.getData();
      this.akun = {};
      this.modalMode = "add";
      this.dataFocus = null;
      this.loadingbtn = false;
    },
    editDialog(val) {
      const usrGt = _.find(this.data.data, ["id", val]);
      this.dataFocus = val;
      this.akun = {
        no_rekening: usrGt.no_rekening,
        nama_rekening: usrGt.nama_rekening,
        status: usrGt.status,
      };
      this.modalMode = "edit";
      this.showModal = true;
    },
    async simpanAkun() {
      this.loadingbtn = true;
      $fetch("/api/akun/addAkun", {
        method: "post",
        body: {
          no_rekening: this.akun.no_rekening,
          nama_rekening: this.akun.nama_rekening,
          tahun: await getTahun(),
          status: this.akun.status,
        },
      }).then((svSt) => {
        if (svSt.result == "success") {
          const rsp = svSt;
          this.resetfield();
          this.showModal = false;
          notifikasi(rsp.result, rsp.title);
        } else {
          console.log(svSt);
        }
      });
    },
    async updateUser() {
      this.loadingbtn = true;
      $fetch(`/api/akun/updateAkun?id=${this.dataFocus}`, {
        method: "PUT",
        body: {
          no_rekening: this.akun.no_rekening,
          nama_rekening: this.akun.nama_rekening,
          tahun: await getTahun(),
          status: this.akun.status,
        },
      }).then((upSt) => {
        if (upSt.result == "success") {
          const rsp = upSt;
          this.resetfield();
          this.showModal = false;
          notifikasi(rsp.result, rsp.title);
        } else {
          console.log(upSt);
        }
      });
    },
    async hapusUser() {
      this.loadingbtn = true;
      $fetch(`/api/akun/deleteAkun?id=${this.dataFocus}`, {
        method: "PUT",
      }).then((delSt) => {
        const rsp = delSt;
        if (delSt.result == "success") {
          this.resetfield();
          this.showModaldelete = false;
        } else {
          this.loadingbtn = false;
          console.log(delSt);
        }
        notifikasi(rsp.result, rsp.title);
      });
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
    this.$emit("judul", "Akun Rekening");
  },
  head: {
    title: "Akun Rekening",
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
          <h4 class="card-title mb-0 flex-grow-1">Data Akun Rekening</h4>
          <div class="flex-shrink-0">
            <div class="d-flex flex-wrap mb-0 my-n1">
              <button
                type="button"
                class="btn btn-success"
                @click="showModal = true"
              >
                Tambah
              </button>
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
                <tr v-for="(dtu, i) in data.data.slice().reverse()">
                  <td class="align-middle">{{ i + 1 }}.</td>
                  <td class="align-middle">
                    {{ dtu.no_rekening }}
                  </td>
                  <td class="align-middle">{{ dtu.nama_rekening }}</td>
                  <td class="align-middle">
                    <span
                      class="font-semibold"
                      :class="
                        dtu.status == 'active'
                          ? 'text-green-500'
                          : 'text-red-500'
                      "
                      >{{ dtu.status }}</span
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
            {{ modalMode == "add" ? "Tambah" : "Edit" }} Rekening
          </h3>
          <form>
            <div class="mb-4">
              <label for="inputnorek" class="form-label">No. Rekening</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="akun.no_rekening"
                id="inputnorek"
              />
            </div>
            <div class="mb-4">
              <label for="inpunamarek" class="form-label">Nama Rekening</label>
              <input
                required
                type="text"
                class="form-control"
                v-model="akun.nama_rekening"
                id="inpunamarek"
              />
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label for="inputstatusrek" class="form-label">Status</label>
                <select
                  class="form-control"
                  id="inputstatusrek"
                  v-model="akun.status"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Non-Aktif</option>
                </select>
              </div>
            </div>
          </form>
        </template>
        <template #btnadd>
          <button
            class="btn btn-success lanim ml-3"
            v-if="modalMode == 'add'"
            @click="simpanAkun"
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
                Hapus Akun ini?
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <span class="block mb-2"
                    >Anda yakin ingin menghapus akun rekening ini?</span
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
