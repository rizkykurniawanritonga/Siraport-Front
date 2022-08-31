<script>
import _ from "lodash";
export default {
  data() {
    return {
      caridata: "",
      tabelin: null,
      datatabel: null,
      showModal: false,
      sidepnl: false,
      loadingbtn: false,
      datatabelrecvry: {},
      dataKelompok: {},
      addnamaKelompok: "",
      addKeterangan: "",
      hdrtbl: ["Uraian", "Satuan", "Koefisien", "Harga", "Total", "Action"],
      filter: storeData("get", {
        key: "detail-" + useRoute().params.idbelanja,
      }),
    };
  },
  methods: {
    resetfield() {
      this.addnamaKelompok = "";
      this.addKeterangan = "";
      this.getKelompok();
    },
    async getKelompok() {
      const Audt = await apiKoneksi(`/belanja/getBelanja/${this.filter}`);
      if (Audt.result == "success") {
        const rsp = Audt;
        this.dataKelompok = rsp.data;
        notifikasi(Audt.result, Audt.title);
      } else {
        console.log(Audt);
      }
    },
    async simpanKelompok() {
      this.loadingbtn = true;
      const efs = await apiKoneksi(
        "/belanja/addBelanja",
        {
          body: {
            id_kegiatan_sub_uraian: this.filter,
            kode_rek: "0",
            uraian: this.addnamaKelompok,
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
  },
  created() {},
  mounted() {
    this.getKelompok();
    this.$emit("judul", "Kegiatan / Sub Kegiatan Belanja");
  },
  head: {
    title: "Sub Kegiatan",
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
        <div class="card-header">
          <h4 class="card-title my-1">Data Belanja</h4>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="table-responsive">
            <table class="table w-auto table-bordered mb-0">
              <thead>
                <tr>
                  <th colspan="4">Data Lengkap</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex px-3 my-4">
            <div class="col-md-3 row flex-1 me-auto">
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
                  v-model="caridata"
                />
              </div>
            </div>
            <div
              class="btn-toolbar gap-2 flex-none"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div class="btn-group" role="group" aria-label="First group">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="sidepnl = true"
                >
                  Tambah Belanja
                </button>
              </div>
              <div class="btn-group" role="group" aria-label="Second group">
                <button type="button" class="btn btn-secondary">5</button>
                <button type="button" class="btn btn-secondary">6</button>
                <button type="button" class="btn btn-secondary">7</button>
              </div>
              <div class="btn-group" role="group" aria-label="Third group">
                <button type="button" class="btn btn-secondary">8</button>
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
              <tbody></tbody>
            </table>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <Sidepanel
        :show="sidepnl"
        pos="end"
        @tutup="sidepnl = false"
        :clickOutside="false"
      >
        <template #title>
          <span>FORM KEGIATAN / SUB KEGIATAN</span>
        </template>
        <template #content>
          <div class="mb-3">
            <label class="form-label" for="formrow-firstname-input"
              >Pengelompokan Belanja</label
            >
            <div class="hstack gap-3">
              <Select2>
                <option value="bobo" v-for="dt in dataKelompok">
                  {{ dt.uraian }}
                </option>
              </Select2>
              <div class="vr"></div>
              <button
                type="button"
                class="btn btn-success"
                @click="showModal = true"
              >
                <i class="bx bx-plus align-middle text-lg"></i>
              </button>
            </div>
          </div>
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </template>
      </Sidepanel>
      <Modal :show="showModal" @tutup="showModal = false">
        <template #content>
          <h3
            class="text-lg leading-6 font-semibold text-gray-900 mb-4"
            id="modal-title"
          >
            Tambah Kelompok
          </h3>
          <form>
            <div class="mb-4">
              <label for="formrow-kode-input" class="form-label"
                >Nama Kelompok Belanja</label
              >
              <input
                type="text"
                class="form-control"
                v-model="addnamaKelompok"
                id="formrow-kode-input"
              />
            </div>
            <div class="mb-2">
              <label for="formrow-kode-input" class="form-label"
                >Rekening</label
              >
              <Select2>
                <option value="bobo">1</option>
              </Select2>
            </div>
          </form>
        </template>
        <template #btnadd>
          <button
            class="btn btn-success lanim ml-3"
            @click.prevent="simpanKelompok"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-show="loadingbtn"
            ></span>
            <span v-show="!loadingbtn">Simpan</span>
          </button>
        </template>
      </Modal>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>
