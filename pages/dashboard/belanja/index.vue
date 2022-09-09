<script>
import _ from "lodash";
export default {
  async setup() {
    const [{ data: datatabelrecvry }] = await Promise.all([
      apiKoneksi("/anggaran/getDataFlat"),
    ]);

    return {
      datatabelrecvry,
    };
  },
  data() {
    return {
      caridata: "",
      panelData: {},
      tabelin: null,
      datatabel: null,
      sidepnl: false,
      hdrtbl: [
        // "Urusan",
        // "Urusan Bidang",
        // "Program",
        // "Kegiatan",
        // "Kegiatan Sub",
        "Sub Kegiatan",
        "Status",
        "Operator",
        "Action",
      ],
    };
  },
  watch: {
    caridata(val) {
      this.datatabel =
        val == "" ? this.datatabelrecvry : searchFor(this.datatabelrecvry, val);
    },
  },
  methods: {
    nextPage(val) {
      const route = useRoute();
      const uid = idunq();
      const cks = useCookie(uid);
      cks.value = val;
      navigateTo({
        path: `${route.path}/detail-${uid}`,
      });
    },
    spasiin(txt) {
      return _.repeat("\u00A0\u00A0", txt.split(".").length - 1) + txt;
    },
    async panelDetailKeg(id) {
      const Audt = await apiKoneksi("/anggaran/kegiatanSubUraian");
      if (Audt.result == "success" && Audt.data.token != "") {
        notifikasi(Audt.result, Audt.title);
        this.panelData = _.find(Audt.data, ["id", id]);
        console.log(this.panelData);
        this.sidepnl = true;
      }
    },
  },
  created() {
    this.datatabel = this.datatabelrecvry;
  },
  mounted() {
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
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <div>
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-title rounded bg-soft-danger">
                  <i class="bx bx-wallet font-size-24 mb-0 text-danger"></i>
                </div>
              </div>

              <div class="flex-grow-1 ms-3">
                <h6 class="mb-0 font-size-15">Batasan Pagu</h6>
              </div>
            </div>

            <div>
              <h4 class="mt-4 mb-2 pt-1 font-size-22">
                Rp. 150.000.000
                <span class="text-success fw-medium font-size-13 align-middle">
                  <i class="mdi mdi-arrow-up"></i> 8.34%
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <div>
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-title rounded bg-soft-success">
                  <i class="bx bx-cart-alt font-size-24 mb-0 text-success"></i>
                </div>
              </div>

              <div class="flex-grow-1 ms-3">
                <h6 class="mb-0 font-size-15">Pagu Validasi</h6>
              </div>
            </div>

            <div>
              <h4 class="mt-4 mb-2 pt-1 font-size-22">
                Rp. 70.000.000
                <span class="text-success fw-medium font-size-13 align-middle">
                  <i class="mdi mdi-arrow-up"></i> 8.34%
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <div>
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-title rounded bg-soft-primary">
                  <i class="bx bx-cart font-size-24 mb-0 text-primary"></i>
                </div>
              </div>

              <div class="flex-grow-1 ms-3">
                <h6 class="mb-0 font-size-15">Rincian</h6>
              </div>
            </div>

            <div>
              <h4 class="mt-4 pt-1 mb-2 font-size-22">
                Rp. 30.000.000
                <span class="text-success fw-medium font-size-13 align-middle">
                  <i class="mdi mdi-arrow-up"></i> 8.34%
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header align-items-center d-flex">
          <h4 class="card-title mb-0 flex-grow-1">Data Belanja</h4>
          <div class="flex-shrink-0 hidden">
            <div class="d-flex flex-wrap mb-0 my-n1">
              <Dropdown
                btnclass="btn-primary !rounded-r-none dropdown-toggle"
                dropclass="right-0 border"
              >
                <template #btntxt>
                  Struktur <i class="mdi mdi-chevron-down"></i>
                </template>
                <template #dropcontent>
                  <a class="dropdown-item" href="#">2022</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Base</a>
                </template>
              </Dropdown>
              <Dropdown
                btnclass="btn-secondary border-l !border-l-gray-300 !rounded-l-none dropdown-toggle"
                dropclass="right-0 border"
              >
                <template #btntxt>
                  <i class="mdi mdi-chevron-down"></i>
                </template>
                <template #dropcontent>
                  <a class="dropdown-item" href="#"
                    >Duplikat ke tahun selanjutnya</a
                  >
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Base</a>
                </template>
              </Dropdown>
              <!-- /btn-group -->
              <button
                type="button"
                @click="sidepnl = true"
                class="btn btn-success ml-3"
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
                  v-model="caridata"
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
                <tr
                  v-for="dtu in datatabel"
                  :class="[
                    dtu.type == 'urusan'
                      ? 'bg-gray-50 border-t-2 border-gray-200/80 furusan'
                      : '',
                  ]"
                >
                  <td
                    :colspan="dtu.type == 'kegiatan_sub_uraian' ? '3' : '4'"
                    class="align-middle"
                    :class="[dtu.type == 'urusan' && 'font-bold']"
                  >
                    {{ spasiin(dtu.kd) }}. {{ dtu.uraian }}
                  </td>
                  <td
                    class="flex gap-2 justify-center"
                    v-if="dtu.type == 'kegiatan_sub_uraian'"
                  >
                    <button
                      type="button"
                      class="btn btn-soft-warning waves-effect waves-light"
                    >
                      <i
                        class="bx bxs-conversation font-size-16 align-middle"
                      ></i>
                    </button>
                    <Dropdown
                      btnclass="btn-secondary waves-effect waves-light"
                      dropclass="dropdown-menu right-0 dropdownmenu-success"
                    >
                      <template #btntxt>
                        <i
                          class="bx bx-chevron-down font-size-16 align-middle"
                        ></i>
                      </template>
                      <template #dropcontent>
                        <button
                          class="dropdown-item"
                          @click="panelDetailKeg(dtu.id)"
                        >
                          <i class="bx bx-note align-middle mr-1"></i> Detail
                          Sub Kegiatan
                        </button>
                        <button class="dropdown-item" @click="nextPage(dtu.id)">
                          <i class="bx bxs-edit align-middle mr-1"></i> Detail
                          Rincian
                        </button>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#"
                          ><i class="bx bx-printer align-middle mr-1"></i> Cetak
                          Rincian</a
                        >
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="#"
                          ><i class="bx bx-trash align-middle mr-1"></i>
                          Hapus</a
                        >
                      </template>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <Sidepanel :show="sidepnl" pos="end" @tutup="sidepnl = false">
        <template #title>
          <span>Form Kegiatan / Sub Kegiatan</span>
        </template>
        <template #content>
          <dl class="row mb-0" v-for="(dt, key) in panelData">
            <dt class="col-sm-4">{{ key }}</dt>
            <dd class="col-sm-8">
              {{ dt }}
            </dd>
          </dl>
        </template>
      </Sidepanel>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>
