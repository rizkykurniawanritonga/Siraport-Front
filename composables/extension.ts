import cogoToast from "cogo-toast";
import { _ } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useDocumentVisibility, useWebNotification } from "@vueuse/core";
import CryptoJS from "crypto-js";

//encryption
function encryptAES(data, keyStr = useAppConfig().apiSecret) {
  const dt = CryptoJS.AES.encrypt(
    _.isObject(data) ? JSON.stringify(data) : data,
    keyStr
  ).toString();
  return (_.isObject(data) ? "json|" : "") + dt;
}
//Decrypt
function decryptAES(data, keyStr = useAppConfig().apiSecret) {
  const stjson = _.includes(data, "json|");
  data = stjson ? _.replace(data, "json|", "") : data;
  var bytes = CryptoJS.AES.decrypt(data, keyStr);
  var decy = bytes.toString(CryptoJS.enc.Utf8);
  return stjson ? JSON.parse(decy) : decy;
}

function formatPrice(value) {
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function notifikasi(type, txt) {
  const cgo = {
    position: "bottom-center",
  };
  return cogoToast[type](txt, cgo);
}
function nativeNotifikasi(type, txt) {
  const { isSupported, show } = useWebNotification({
    title: "SIRAPORT - " + _.toUpper(type),
    body: txt,
    dir: "auto",
    lang: "en",
    renotify: true,
    tag: "test",
  });
  if (isSupported.value) show();
}
async function flashNotifikasi(mode = "init", tipe = null, teks = null) {
  const ck = await storeData("get", { key: "notif" });
  if (mode == "init" && ck) {
    const tks = await storeData("flash", { key: "notif" })
      .then(function (value) {
        return value;
      })
      .catch(function (err) {
        console.log(err);
      });
    notifikasi(tks["type"], tks["text"]);
  } else if (mode == "set") {
    let dt = {
      type: tipe,
      text: teks,
    };
    storeData("set", { key: "notif", val: dt });
  }
}

function idunq() {
  return uuidv4();
}

function focusBack() {
  return useDocumentVisibility();
}

export {
  encryptAES,
  decryptAES,
  focusBack,
  formatTanggal,
  formatPrice,
  idunq,
  notifikasi,
  nativeNotifikasi,
  flashNotifikasi,
};
