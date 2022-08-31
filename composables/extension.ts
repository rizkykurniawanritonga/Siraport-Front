import cogoToast from "cogo-toast";
import { _ } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useDocumentVisibility } from "@vueuse/core";
// import { useWebNotification } from "@vueuse/core";

function notifikasi(type, txt) {
  // const { isSupported, show } = useWebNotification({
  //   title: "SIRAPORT - " + _.toUpper(type),
  //   body: txt,
  //   dir: "auto",
  //   lang: "en",
  //   renotify: true,
  //   tag: "test",
  // });
  // if (isSupported.value) show();
  const cgo = {
    position: "bottom-center",
  };
  return cogoToast[type](txt, cgo);
}
async function flashNotifikasi(mode = "init", tipe = null, teks = null) {
  const ck = storeData("get", { key: "notif" });
  if (mode == "init" && ck) {
    const tks = await storeData("flash", { key: "notif" });
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

export { focusBack, idunq, notifikasi, flashNotifikasi };
