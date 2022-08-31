<script>
import _ from "lodash";
export default {
  async setup() {
    const [{ data: datatabelrecvry }] = await Promise.all([
      apiKoneksi("/base/getDataFlat"),
    ]);

    return {
      datatabelrecvry,
    };
  },
  data() {
    return {
      caridata: "",
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
      storeData("set", { key: "kegiatan-" + uid, val: val });
      navigateTo({
        path: `${route.path}/kegiatan-${uid}`,
      });
    },
    spasiin(txt) {
      return _.repeat("\u00A0\u00A0", txt.split(".").length - 1) + txt;
    },
  },
  created() {
    this.datatabel = this.datatabelrecvry;
  },
  mounted() {
    this.$emit("judul", "Sub Kegiatan");
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
          <h4 class="card-title mb-0 flex-grow-1">Data Sub Kegiatan</h4>
          <div class="flex-shrink-0">
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
                      ? 'bg-gray-50 border-t-2 border-gray-200/80'
                      : '',
                  ]"
                >
                  <td
                    colspan="3"
                    class="align-middle"
                    :class="[dtu.type == 'urusan' && 'font-bold']"
                  >
                    {{ spasiin(dtu.kd) }}. {{ dtu.uraian }}
                  </td>
                  <td>
                    <div
                      class="grid gap-2 grid-cols-3"
                      v-if="dtu.type == 'kegiatan_sub_uraian'"
                    >
                      <button
                        type="button"
                        class="btn btn-soft-primary waves-effect waves-light"
                      >
                        <i class="bx bx-smile font-size-16 align-middle"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-soft-success waves-effect waves-light"
                      >
                        <i
                          class="bx bx-check-double font-size-16 align-middle"
                        ></i>
                      </button>
                      <Dropdown
                        btnclass="btn-secondary waves-effect waves-light"
                        dropclass="dropdown-menu right-0 dropdownmenu-success"
                      >
                        <template #btntxt>
                          <i class="bx bx-search font-size-16 align-middle"></i>
                        </template>
                        <template #dropcontent>
                          <button
                            class="dropdown-item"
                            @click="nextPage(dtu.id)"
                          >
                            Detail
                          </button>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item active" href="#"
                            >Something else here</a
                          >
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item text-danger" href="#"
                            >Hapus</a
                          >
                        </template>
                      </Dropdown>
                    </div>
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
          <span>Backdrop with scrolling</span>
        </template>
        <template #content>
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </template>
      </Sidepanel>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>
