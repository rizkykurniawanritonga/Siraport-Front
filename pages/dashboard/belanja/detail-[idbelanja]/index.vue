<script>
import _ from "lodash";
export default {
  async setup() {
    const filter = useCookie(useRoute().params.idbelanja).value;
    const [
      { data: detailBelanja, refresh: getBelanja, pending: stateDetail },
      { data: dataRekening },
      { data: dataKelompok, refresh: getKelompok },
      { data: dataSatuan },
    ] = await Promise.all([
      useLazyAsyncData("dataDapetin", () =>
        $fetch(`/api/fetch/read?chain=belanja-detailRincian&id=${filter}`)
      ),
      useLazyAsyncData("bacaRekening", () => $fetch("/api/akun/readAkun")),
      useLazyAsyncData("getBelanja", () =>
        $fetch(`/api/fetch/read?chain=belanja-getBelanja&id=${filter}`)
      ),
      useLazyAsyncData("getSatuan", () =>
        $fetch(`/api/fetch/read?chain=satuan-getSatuan`)
      ),
    ]);
    const refreshData = () => {
      refreshNuxtData("dataDapetin");
      refreshNuxtData("bacaRekening");
      refreshNuxtData("getBelanja");
      refreshNuxtData("getSatuan");
    };
    return {
      detailBelanja,
      stateDetail,
      getBelanja,
      dataRekening,
      dataKelompok,
      getKelompok,
      dataSatuan,
      filter,
      refreshData,
    };
  },
  created() {
    this.refreshData();
  },
  data() {
    return {
      caridata: "",
      tabelin: null,
      datatabel: null,
      showModal: false,
      sidepnl: false,
      loadingbtn: false,
      dataFocus: "",
      showModaldelete: false,
      datatabelrecvry: {},
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
      hdrtbl: ["Uraian", "Koefisien / Satuan", "Harga", "Total", "Action"],
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
      this.dataFocus = "";
      this.getKelompok();
      this.loadingbtn = false;
    },
    async hapusBelanja() {
      this.loadingbtn = true;
      $fetch(
        `/api/fetch/delete?chain=belanja-deleteBelanjaSpek&id=${this.dataFocus}`,
        {
          method: "PUT",
        }
      ).then((delSt) => {
        if (delSt.result == "success") {
          const rsp = delSt;
          this.resetfield();
          this.showModaldelete = false;
          this.getBelanja();
          notifikasi(rsp.result, rsp.title);
        } else {
          console.log(delSt);
        }
      });
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
          },
        },
        "POST"
      );
      if (efs1.result == "success") {
        const rsp1 = efs1;
        const efs3 = await apiKoneksi(
          "/belanja/addNilaiBelanja",
          {
            body: {
              id_belanja_spek: rsp1.data.id,
              spek_detail: this.spekBarang,
              koefisien_before: this.koefisienBarang.toString(),
              satuan_before: this.satuanBarang,
              harga_before: this.hargaBarang,
              ppn_before: 0,
              jumlah_before: this.hargaBarang * this.koefisienBarang,
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
          this.getBelanja();
          this.sidepnl = false;
          notifikasi(rsp3.result, rsp3.title);
        } else {
          console.log(efs3);
        }
      } else {
        console.log(efs1);
      }
    },
  },
  mounted() {
    this.$emit("judul", "Kegiatan / Sub Kegiatan Belanja");
    console.log(this.detailBelanja);
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
        <div class="card-header align-items-center d-flex">
          <NuxtLink to="/dashboard/belanja"
            ><i
              class="bx bx-left-arrow-alt text-3xl align-middle text-black mr-4"
            ></i
          ></NuxtLink>
          <h4 class="card-title mb-0 flex-grow-1">
            Data Belanja:
            {{
              detailBelanja.data &&
              detailBelanja.data.detail.sub_kegiatan_uraian
            }}
          </h4>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped mb-0 border">
              <thead>
                <tr>
                  <th colspan="3" class="uppercase">Detil Sub Kegiatan</th>
                </tr>
              </thead>
              <tbody
                v-if="
                  !stateDetail &&
                  detailBelanja.data &&
                  detailBelanja.data.detail
                "
              >
                <tr>
                  <th scope="row" width="180">Bidang</th>
                  <th scope="row" width="5">:</th>
                  <td>
                    {{ detailBelanja.data && detailBelanja.data.detail.bidang }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" width="180">Program</th>
                  <th scope="row" width="5">:</th>
                  <td>
                    {{
                      detailBelanja.data && detailBelanja.data.detail.program
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" width="180">Kegiatan</th>
                  <th scope="row" width="5">:</th>
                  <td>
                    {{
                      detailBelanja.data && detailBelanja.data.detail.kegiatan
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" width="180">Sub Kegiatan</th>
                  <th scope="row" width="5">:</th>
                  <td>
                    {{
                      detailBelanja.data &&
                      detailBelanja.data.detail.sub_kegiatan
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" width="180">Sub Kegiatan Uraian</th>
                  <th scope="row" width="5">:</th>
                  <td>
                    {{
                      detailBelanja.data &&
                      detailBelanja.data.detail.sub_kegiatan_uraian
                    }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="stateDetail">
                <tr>
                  <td class="lead py-5 text-muted text-center" colspan="5">
                    <div
                      class="spinner-border text-secondary m-1 align-middle"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                    Loading...
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="lead py-5 text-muted text-center" colspan="5">
                    Data Gagal di load
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex md:w-2/4 gap-3 mt-5 mb-1">
            <div
              class="alert alert-success alert-outline flex flex-1 gap-4 items-center px-4"
              role="alert"
            >
              <div class="flex-none">
                <i class="bx bx-cart-alt text-3xl"></i>
              </div>
              <span class="flex flex-col"
                ><span>Pagu Validasi</span
                ><span class="text-xl">{{ formatPrice(100750000) }}</span>
              </span>
            </div>
            <div
              class="alert alert-primary alert-outline flex flex-1 gap-4 items-center px-4"
              role="alert"
            >
              <div class="flex-none">
                <i class="bx bx-cart-alt text-3xl"></i>
              </div>
              <span class="flex flex-col"
                ><span>Rincian</span
                ><span class="text-xl">{{ formatPrice(100750000) }}</span>
              </span>
            </div>
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
              <tbody v-if="stateDetail">
                <tr>
                  <td class="lead py-5 text-muted text-center" colspan="5">
                    <div
                      class="spinner-border text-secondary m-1 align-middle"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                    Loading...
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="detailBelanja.data.belanja == 0">
                <tr>
                  <td class="lead py-5 text-muted text-center" colspan="5">
                    Tidak ada data Belanja pada Sub Kegiatan ini
                  </td>
                </tr>
              </tbody>
              <tbody v-else v-for="dt in detailBelanja.data.belanja">
                <tr class="bg-green-100/50">
                  <th colspan="5">[#] {{ dt.kelompok }}</th>
                </tr>
                <tr>
                  <th colspan="5">[-]</th>
                </tr>
                <tr class="bg-gray-100/50">
                  <td colspan="5">{{ dt.data[0].rekening }}</td>
                </tr>
                <tr v-for="dts in dt.data[0].belanja">
                  <td class="flex gap-2 align-middle">
                    <div class="flex items-center">
                      <button
                        type="button"
                        class="btn flex-none btn-primary btn-sm waves-effect waves-light rounded-circle py-2 px-3 -ml-1 mr-2 scale-75"
                        :data-tooltip="`Dibuat ${dts.created_by} pada ${dts.created_at}`"
                        data-tooltip-location="right"
                      >
                        ?
                      </button>
                    </div>
                    <span
                      >{{ dts.uraian }}<br />Spesifikasi:
                      {{ dts.spek_detail }}</span
                    >
                  </td>
                  <td>
                    {{ dts.koefisien || dts.koefisien_before }}
                    {{ dts.satuan || dts.satuan_before }}
                  </td>
                  <td>
                    {{ "Rp. " + formatPrice(dts.harga || dts.harga_before) }}
                  </td>
                  <td>
                    {{ "Rp. " + formatPrice(dts.jumlah || dts.jumlah_before) }}
                  </td>
                  <td class="flex gap-2 justify-center">
                    <button
                      type="button"
                      class="btn btn-soft-primary waves-effect waves-light"
                    >
                      <i class="bx bxs-edit font-size-16 align-middle"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-soft-danger waves-effect waves-light"
                      @click="
                        (dataFocus = dts.id_spek), (showModaldelete = true)
                      "
                    >
                      <i class="bx bx-trash font-size-16 align-middle"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
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
                <option :value="dt.id" v-for="dt in dataKelompok.data">
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
            v-show="selectKelompok"
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
          <div
            class="row mb-3 bg-gray-100 border-b border-gray-300"
            v-show="selectKelompok"
          >
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
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
            </div>
            <div class="col-12 mt-2 mb-4">
              <input
                type="text"
                class="form-control text-center !font-bold 2xl:!text-lg !text-md"
                readonly
                id="inputhargasatuan"
                :value="
                  `Total Harga: Rp. ` +
                  formatPrice(hargaBarang * koefisienBarang)
                "
              />
            </div>
          </div>

          <div class="row" v-show="selectKelompok">
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
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
              <select class="form-control mb-2" id="inputsatuans">
                <option value="0" disabled>- PILIH SATUAN -</option>
                <option :value="dt.id" v-for="dt in dataSatuan.data">
                  {{ dt.nama_satuan }}
                </option>
              </select>
            </div>
          </div>
          <p class="pt-3 text-gray-400" v-show="selectKelompok">
            Sebelum menyimpan cek data terlebih dahulu dengan baik.
          </p>
          <button
            type="submit"
            class="btn btn-success w-md"
            :class="loadingbtn ? 'btn-soft-success' : 'btn-success'"
            @click.prevent="simpanBelanja"
            v-show="selectKelompok"
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
                <option :value="dt.id" v-for="dt in dataRekening.data">
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
                Hapus Belanja ini?
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Anda yakin ingin menghapus data belanja ini? data tidak dapat
                  dikembalikan kembali
                </p>
              </div>
            </div>
          </div></template
        >
        <template #btnadd>
          <button class="btn btn-danger ml-3" @click.prevent="hapusBelanja">
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
