<script>
import _ from "lodash";
export default {
  async setup() {
    const filter = await storeData("get", {
      key: "detail-" + useRoute().params.idbelanja,
    });
    const [{ data: dataSatuan }] = await Promise.all([
      apiKoneksi("/satuan/getSatuan"),
    ]);
    const [{ data: dataRekening }] = await Promise.all([apiKoneksi("/akun")]);
    return { dataSatuan, dataRekening, filter };
  },
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
      selectKelompok: 0,
      rekaddKelompok: "",
      namaBarang: "",
      spekBarang: "",
      koefisienBarang: "",
      satuanBarang: "0",
      hargaBarang: "",
      modeBelanja: "add",
      addnamaKelompok: "",
      addKeterangan: "",
      hdrtbl: ["Uraian", "Satuan", "Koefisien", "Harga", "Total", "Action"],
    };
  },
  methods: {
    resetfield() {
      this.selectKelompok = 0;
      this.namaBarang = "";
      this.spekBarang = "";
      this.koefisienBarang = "";
      this.satuanBarang = "0";
      this.hargaBarang = "";
      this.modeBelanja = "add";
      this.addnamaKelompok = "";
      this.addKeterangan = "";
      this.rekaddKelompok = "";
      this.getKelompok();
      this.getRekening();
      this.loadingbtn = false;
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
            id_akun: this.rekaddKelompok,
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
        this.selectKelompok = rsp.data.id;
      } else {
        console.log(efs);
      }
    },
    async simpanBelanja() {
      this.loadingbtn = true;
      const efs1 = await apiKoneksi(
        "/belanja/addBelanjaSpek",
        {
          body: {
            id_belanja: this.selectKelompok,
            uraian: this.namaBarang,
            satuan: this.satuanBarang,
            koefisien: this.koefisienBarang,
            harga: this.hargaBarang,
            total: this.hargaBarang * this.koefisienBarang,
          },
        },
        "POST"
      );
      if (efs1.result == "success") {
        const rsp1 = efs1;
        const efs2 = await apiKoneksi(
          "/belanja/addBelanjaSpekDetail",
          {
            body: {
              id_belanja_spek: rsp1.data.id,
              uraian: this.namaBarang,
              spek: this.spekBarang,
            },
          },
          "POST"
        );
        if (efs2.result == "success") {
          const rsp2 = efs2;
          const efs3 = await apiKoneksi(
            "/belanja/addNilaiBelanja",
            {
              body: {
                id_belanja_spek_detail: rsp2.data.id,
                koefisien_before: this.koefisienBarang,
                satuan_before: this.satuanBarang,
                harga_before: this.hargaBarang,
                ppn_before: 0,
                jumlah_before: this.hargaBarang * this.satuanBarang,
                koefisien_after: "",
                satuan_after: "",
                harga_after: 0,
                ppn_after: 0,
                jumlah_after: 0,
              },
            },
            "POST"
          );
          if (efs3.result == "success") {
            const rsp3 = efs3;
            this.resetfield();
            this.sidepnl = false;
            notifikasi(rsp3.result, rsp3.title);
          } else {
            console.log(efs3);
          }
        } else {
          console.log(efs2);
        }
      } else {
        console.log(efs1);
      }
    },
  },
  created() {},
  mounted() {
    this.resetfield();
    console.log(this.filter);
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
                  class="form-control mb-0"
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
          <div class="mb-4">
            <label class="form-label" for="formrow-firstname-input"
              >Pengelompokan Belanja</label
            >
            <div class="hstack gap-3">
              <select class="form-control" v-model="selectKelompok">
                <option :value="dt.id" v-for="dt in dataKelompok">
                  {{ dt.uraian }}
                </option>
              </select>
              <div class="vr"></div>
              <button
                type="button"
                class="btn btn-success"
                @click="showModal = true"
              >
                <i class="bx bx-plus align-middle"></i>
              </button>
            </div>
          </div>
          <div
            class="-mx-3 pt-4 pb-3 px-3 bg-gray-100 border-t border-gray-300"
          >
            <label class="form-label" for="formrow-firstname-input"
              >Nama Barang / Kegiatan</label
            >
            <div class="hstack -mx-1 gap-3">
              <input type="text" class="form-control" v-model="namaBarang" />
              <div class="vr"></div>
              <button
                type="button"
                class="btn btn-success"
                @click="showModal = true"
              >
                <i class="bx bx-search align-middle"></i>
              </button>
            </div>
          </div>
          <div class="row mb-3 bg-gray-100 border-b border-gray-300">
            <div class="col-12 mb-3">
              <label class="form-label" for="inputspekbarang"
                >Spesifikasi Barang</label
              >
              <textarea
                class="form-control"
                id="inputspekbarang"
                rows="4"
                placeholder="Rincikan detail spesifikasi barang"
                v-model="spekBarang"
              ></textarea>
            </div>
            <div class="col">
              <label class="form-label" for="inputkoebel">Koefisien</label>
              <input
                type="number"
                class="form-control"
                id="inputkoebel"
                v-model="koefisienBarang"
              />
            </div>
            <div class="col">
              <label class="form-label" for="inputhargasatuan">Harga</label>
              <input
                type="number"
                class="form-control"
                id="inputhargasatuan"
                v-model="hargaBarang"
              />
            </div>
            <div class="col">
              <label class="form-label" for="inputsatuans">Satuan</label>
              <select
                class="form-control"
                id="inputsatuans"
                v-model="satuanBarang"
              >
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
            </div>
            <div class="col-12 mt-2 mb-4">
              <input
                type="text"
                class="form-control text-center !font-bold !text-lg"
                readonly
                id="inputhargasatuan"
                :value="
                  `Total Harga: Rp. ` +
                  formatPrice(hargaBarang * koefisienBarang)
                "
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label class="form-label" for="inputhargasatuan">Harga</label>
              <input
                type="number"
                class="form-control mb-2"
                id="inputhargasatuan"
              />
              <input
                type="number"
                class="form-control mb-2"
                id="inputhargasatuan"
              />
              <input
                type="number"
                class="form-control mb-2"
                id="inputhargasatuan"
              />
              <input
                type="number"
                class="form-control mb-2"
                id="inputhargasatuan"
              />
              <input
                type="number"
                class="form-control mb-2"
                id="inputhargasatuan"
              />
            </div>
            <div class="col">
              <label class="form-label" for="inputsatuans">Satuan</label>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan">
                  {{ dt.nama_satuan }}
                </option>
              </select>
            </div>
          </div>
          <p class="pt-3 text-gray-400">
            Sebelum menyimpan cek data terlebih dahulu dengan baik.
          </p>
          <button
            type="submit"
            class="btn btn-success w-md"
            :class="loadingbtn ? 'btn-soft-success' : 'btn-success'"
            @click.prevent="simpanBelanja"
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
              <label for="inputnamakelbel" class="form-label"
                >Nama Kelompok Belanja</label
              >
              <input
                type="text"
                class="form-control"
                v-model="addnamaKelompok"
                id="inputnamakelbel"
              />
            </div>
            <div class="mb-2">
              <label for="inputrekaddkel" class="form-label">Rekening</label>
              <select
                class="form-control"
                id="inputrekaddkel"
                v-model="rekaddKelompok"
              >
                <option :value="dt.id" v-for="dt in dataRekening">
                  {{ dt.no_rekening }}. {{ dt.nama_rekening }}
                </option>
              </select>
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
