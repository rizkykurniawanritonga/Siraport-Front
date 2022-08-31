<script>
import _ from "lodash";
export default {
  async setup() {
    const filter = _.split(
      await storeData("get", { key: useRoute().query.k }),
      "|"
    );
    return { filter };
  },
  data() {
    return {
      adduraian: "",
      addkoderekening: "",
      showModal: false,
      showModaldelete: false,
      modalMode: "add",
      loadingbtn: false,
      data: null,
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
    this.getData();
  },
  methods: {
    resetfield() {
      this.showModal = false;
      this.showModaldelete = false;
      this.getData();
      setTimeout(() => {
        this.adduraian = "";
        this.addkoderekening = "";
        this.modalMode = "add";
        this.dataFocus = null;
        this.loadingbtn = false;
      }, 1000);
    },
    async getData() {
      const f = this.filter[1];
      const Audt = await apiKoneksi(`/anggaran/kegiatanSubUraian/${f}`);
      if (Audt.result == "success") {
        this.$emit("judul", "Kegiatan Sub");
        const rsp = Audt;
        this.data = rsp.data.reverse();
        notifikasi(Audt.result, Audt.title);
      } else {
        console.log(Audt);
      }
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
      const efs = await apiKoneksi(
        "/anggaran/addKegiatanSubUraian",
        {
          body: {
            id_kegiatan_sub: this.getF(1),
            kode_rek: this.addkoderekening,
            uraian: this.adduraian,
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
        console.log(efs);
      }
    },
    async updateUrusan() {
      this.loadingbtn = true;
      const efu = await apiKoneksi(
        `/anggaran/updateKegiatanSubUraian/${this.dataFocus}`,
        {
          body: {
            id_kegiatan_sub: this.getF(1),
            kode_rek: this.addkoderekening,
            uraian: this.adduraian,
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
    async hapusUrusan() {
      this.loadingbtn = true;
      const efh = await apiKoneksi(
        `/anggaran/deleteKegiatanSubUraian/${this.dataFocus}`,
        {},
        "PUT"
      );
      if (efh.result == "success") {
        const rsp = efh;
        this.resetfield();
        this.showModal = false;
        notifikasi(rsp.result, rsp.title);
      } else {
        console.log(efh);
      }
    },
    nextPage(pg, val) {
      const route = useRoute();
      const uid = idunq();
      storeData("set", { key: uid, val: val });
      navigateTo({
        path: `${route.path}/${pg}`,
        query: {
          k: uid,
        },
      });
    },
    getF(id) {
      return this.filter[id];
    },
  },
  head: {
    title: "Kegiatan Sub Uraian",
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
              Kegiatan Sub Uraian: {{ getF(0) }}
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
                  <tr v-for="dt in data" v-if="data && data.length > 0">
                    <td class="fit">{{ dt.kode_rek }}</td>
                    <td>{{ dt.uraian }}</td>
                    <td class="flex gap-2 justify-center">
                      <button
                        @click="
                          nextPage('kegiatansub', dt.uraian + '|' + dt.id)
                        "
                        class="d-none btn btn-soft-primary waves-effect waves-light"
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
                  <tr v-else>
                    <td class="lead py-5 text-muted text-center" colspan="3">
                      Tidak ada Data
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
                {{ modalMode == "add" ? "Tambah" : "Edit" }} Sub Kegiatan Uraian
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
                    >Keterangan Sub Kegiatan Uraian</label
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
                    Hapus Sub Kegiatan Uraian {{ titleModalDelte }}?
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
