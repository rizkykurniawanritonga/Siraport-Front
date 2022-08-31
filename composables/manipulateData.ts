import _ from "lodash";

function checkTeks(asl, val) {
  return val === asl;
}

function groupStrukturData(dtg) {
  const dt1 = _.initial(JSON.parse(JSON.stringify(dtg)));
  const dt2 = _.groupBy(dt1, "id_urusan");
  const data = {
    urusan: [],
  };
  //loopawal_urusan
  _.forEach(dt2, function (v, k) {
    //id_urusan_bidang
    const dt3 = _.groupBy(v, "id_urusan_bidang");
    const ub = [];
    _.forEach(dt3, function (v2, k2) {
      //program
      const dt4 = _.groupBy(v2, "id_program");
      const pr = [];
      _.forEach(dt4, function (v3, k3) {
        //kegiatan
        const dt5 = _.groupBy(v3, "id_program");
        const keg = [];
        _.forEach(dt5, function (v4, k4) {
          //kegiatansub
          const dt6 = _.groupBy(v4, "id_kegiatan_sub");
          const kegsub = [];
          _.forEach(dt6, function (v5, k5) {
            //kegiatan_sub_uraian
            const dt7 = _.groupBy(v5, "id_kegiatan_sub_uraian");
            const kegsubur = [];
            _.forEach(dt7, function (v6, k6) {
              var ar6 = {
                id: k6,
                kode: v6[0].kd_kegiatan_sub_uraian,
                uraian: v6[0].uraian_kegiatan_sub_uraian,
              };
              v6[0].kd_kegiatan_sub_uraian && kegsubur.push(ar6);
            });
            var ar5 = {
              id: k5,
              kode: v5[0].kd_kegiatan_sub,
              uraian: v5[0].uraian_kegiatan_sub,
              kegiatan_sub_uraian: kegsubur,
            };
            v5[0].kd_kegiatan_sub && kegsub.push(ar5);
          });
          var ar4 = {
            id: k4,
            kode: v4[0].kd_kegiatan,
            uraian: v4[0].uraian_kegiatan,
            kegiatan_sub: kegsub,
          };
          v4[0].kd_kegiatan && keg.push(ar4);
        });
        var ar3 = {
          id: k3,
          kode: v3[0].kd_program,
          uraian: v3[0].uraian_program,
          kegiatan: keg,
        };
        v3[0].kd_program && pr.push(ar3);
      });
      var ar2 = {
        id: k2,
        kode: v2[0].kd_urusan_bidang,
        uraian: v2[0].uraian_urusan_bidang,
        program: pr,
      };
      v2[0].kd_urusan_bidang && ub.push(ar2);
    });
    var ar1 = {
      id: k,
      kode: v[0].kd_urusan,
      uraian: v[0].uraian_urusan,
      urusan_bidang: ub,
    };
    data.urusan.push(ar1);
  });
  return data;
}

function flatSatu(dt) {
  const datt = groupStrukturData(dt);
  const comb = [];
  _.forEach(datt, function (v) {
    _.forEach(v, function (v1) {
      const sb1 = v1.urusan_bidang;
      v1.type = "urusan";
      _.unset(v1, "urusan_bidang");
      comb.push(v1);
      _.forEach(sb1, function (v2) {
        const sb2 = v2.program;
        v2.type = "urusan_bidang";
        _.unset(v2, "program");
        comb.push(v2);
        _.forEach(sb2, function (v3) {
          const sb3 = v3.kegiatan;
          v3.type = "program";
          _.unset(v3, "kegiatan");
          comb.push(v3);
          _.forEach(sb3, function (v4) {
            const sb4 = v4.kegiatan_sub;
            v4.type = "kegiatan";
            _.unset(v4, "kegiatan_sub");
            comb.push(v4);
            _.forEach(sb4, function (v5) {
              const sb5 = v5.kegiatan_sub_uraian;
              v5.type = "kegiatan_sub";
              _.unset(v5, "kegiatan_sub_uraian");
              comb.push(v5);
              _.forEach(sb5, function (v6) {
                v6.type = "kegiatan_sub_uraian";
                comb.push(v6);
              });
            });
          });
        });
      });
    });
  });
  return comb;
}

export { checkTeks, groupStrukturData, flatSatu };
