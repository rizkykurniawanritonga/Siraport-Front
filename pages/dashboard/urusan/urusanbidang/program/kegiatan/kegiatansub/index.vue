<script>
import _ from "lodash";
export default {
  async setup() {
    const filter = _.split(useCookie(useRoute().query.k).value, "|");
    const [{ data: data, refresh: getData, pending }] = await Promise.all([
      useFetch(`/api/struktur/read?chain=anggaran-kegiatanSub&id=${filter[1]}`),
    ]);
    return { data, getData, pending, filter };
  },
  data() {
    return {
      adduraian: "",
      addkoderekening: "",
      showModal: false,
      showModaldelete: false,
      modalMode: "add",
      loadingbtn: false,
      dataFocus: null,
      titleModalDelte: "loading...",
    };
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.resetfield();
      }
    },
  },
  mounted() {
    this.$emit("judul", "Kegiatan Sub");
  },
  methods: {
    resetfield() {
      this.showModal = false;
      this.showModaldelete = false;
      this.getData();
      this.adduraian = "";
      this.addkoderekening = "";
      this.modalMode = "add";
      this.dataFocus = null;
      this.loadingbtn = false;
    },
    editDialog(val, rek, uraian) {
      this.dataFocus = val;
      this.adduraian = uraian;
      this.addkoderekening = rek;
      this.modalMode = "edit";
      this.showModal = true;
    },
    hapusDialog(val, uraian) {
      this.dataFocus = val;
      this.titleModalDelte = uraian;
      this.showModaldelete = true;
    },
    async simpanUrusan() {
      this.loadingbtn = true;
      $fetch("/api/struktur/add?chain=anggaran-addKegiatanSub", {
        method: "post",
        body: {
          id_kegiatan: this.getF(1),
          kode_rek: this.addkoderekening,
          uraian: this.adduraian,
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
    async updateUrusan() {
      this.loadingbtn = true;
      $fetch(
        `/api/struktur/update?chain=anggaran-updateKegiatanSub&id=${this.dataFocus}`,
        {
          method: "PUT",
          body: {
            id_kegiatan: this.getF(1),
            kode_rek: this.addkoderekening,
            uraian: this.adduraian,
          },
        }
      ).then((upSt) => {
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
    async hapusUrusan() {
      this.loadingbtn = true;
      $fetch(
        `/api/struktur/delete?chain=anggaran-deleteKegiatanSub&id=${this.dataFocus}`,
        {
          method: "PUT",
        }
      ).then((delSt) => {
        if (delSt.result == "success") {
          const rsp = delSt;
          this.resetfield();
          this.showModal = false;
          notifikasi(rsp.result, rsp.title);
        } else {
          console.log(delSt);
        }
      });
    },
    nextPage(pg, val) {
      const route = useRoute();
      const uid = idunq();
      const cks = useCookie(uid);
      cks.value = val;
      navigateTo(
        {
          path: `${route.path}/${pg}`,
          query: {
            k: uid,
          },
        },
        { replace: true }
      );
    },
    getF(id) {
      return this.filter[id];
    },
  },
  head: {
    title: "Kegiatan Sub",
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
            <h4 class="card-title mb-0 flex-grow-1">
              Kegiatan Sub: {{ getF(0) }}
            </h4>
            <div class="flex-shrink-0">
              <div class="d-flex flex-wrap gap-2 mb-0 my-n1">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-soft-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Rancangan <i class="mdi mdi-chevron-down"></i>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">2022</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Base</a>
                  </div>
                </div>
                <!-- /btn-group -->
                <button
                  type="button"
                  @click="showModal = true"
                  class="btn btn-success"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
          <!-- end card header -->

          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th class="fit">Kode Rekening</th>
                    <th>Rincian Uraian Bidang</th>
                    <th class="fit">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="dt in data.data.slice().reverse()"
                    v-if="data.data && data.data.length > 0"
                  >
                    <td class="fit">{{ dt.kode_rek }}</td>
                    <td>{{ dt.uraian }}</td>
                    <td class="flex gap-2 justify-center">
                      <button
                        @click="
                          nextPage('kegiatansuburaian', dt.uraian + '|' + dt.id)
                        "
                        class="btn btn-soft-primary waves-effect waves-light"
                      >
                        <i
                          class="bx bx-search-alt-2 font-size-16 align-middle"
                        ></i>
                      </button>
                      <button
                        class="btn btn-soft-info waves-effect waves-light"
                        @click="editDialog(dt.id, dt.kode_rek, dt.uraian)"
                      >
                        <i class="bx bx-edit font-size-16 align-middle"></i>
                      </button>
                      <button
                        class="btn btn-soft-danger waves-effect waves-light"
                        @click="hapusDialog(dt.id, dt.uraian)"
                      >
                        <i
                          class="bx bx-trash-alt font-size-16 align-middle"
                        ></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-else-if="pending">
                    <td class="lead py-5 text-muted text-center" colspan="3">
                      <div
                        class="spinner-border text-secondary m-1 align-middle spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                      Loading...
                    </td>
                  </tr>
                  <tr v-else>
                    <td class="lead py-5 text-muted text-center" colspan="3">
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end card-body -->
          <Modal :show="showModal" @tutup="showModal = false">
            <template #content>
              <h3
                class="text-lg leading-6 font-semibold text-gray-900 mb-4"
                id="modal-title"
              >
                {{ modalMode == "add" ? "Tambah" : "Edit" }} Sub Kegiatan
              </h3>
              <form>
                <div class="mb-4">
                  <label for="formrow-kode-input" class="form-label"
                    >Kode</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="addkoderekening"
                    id="formrow-kode-input"
                    :disabled="modalMode == 'edit'"
                    :readonly="modalMode == 'edit'"
                  />
                </div>
                <div class="mb-2">
                  <label for="formrow-firstname-input" class="form-label"
                    >Keterangan Sub Kegiatan</label
                  >
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="adduraian"
                  ></textarea>
                </div>
              </form>
            </template>
            <template #btnadd>
              <button
                class="btn btn-success lanim"
                v-if="modalMode == 'add'"
                @click.prevent="simpanUrusan"
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
                class="btn btn-success lanim"
                v-else-if="modalMode == 'edit'"
                @click.prevent="updateUrusan"
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
                    Hapus Sub Kegiatan {{ titleModalDelte }}?
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      <span class="block mb-2"
                        >Anda yakin ingin menghapus data ini?</span
                      >{{ titleModalDelte }}
                    </p>
                  </div>
                </div>
              </div></template
            >
            <template #btnadd>
              <button class="btn btn-danger ml-3" @click.prevent="hapusUrusan">
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
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
  </div>
</template>
