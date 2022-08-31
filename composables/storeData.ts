import { _ } from "lodash";
import localForage from "localforage";

async function storeData(mode, sts = null) {
  // setItem, getItem, removeItem, clear
  // sts = key & val
  // 1. sts = {key: 'abc'}
  // 2. sts = {key: 'abc', val: 'def'}
  localForage.config({
    driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: "Siraport-Apps",
    version: 1.0,
    storeName: "siraport_app", // Should be alphanumeric, with underscores.
    description: "Database Browsernya Aplikasi Siraport",
  });
  const dPrfx = "siraport-app";
  if (mode == "set") {
    localForage.setItem(`${dPrfx}:${sts.key}`, sts.val);
  } else if (mode == "get") {
    const dt = await localForage
      .getItem(`${dPrfx}:${sts.key}`)
      .then(function (value) {
        // This code runs once the value has been loaded
        // from the offline store.
        return value;
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
    return dt;
  } else if (mode == "delete") {
    localForage.removeItem(`${dPrfx}:${sts.key}`);
  } else if (mode == "destroy") {
    localForage.clear();
  } else if (mode == "flash") {
    const dt = await localForage.getItem(`${dPrfx}:${sts.key}`);
    localForage.removeItem(`${dPrfx}:${sts.key}`);
    return dt;
  }
}

function setUser(dt) {
  storeData("set", { key: "users", val: dt });
}
async function getUser(key = null) {
  const dt = await storeData("get", { key: "users" });
  return key ? dt[key] : dt;
}

function setToken(vls) {
  storeData("set", { key: "loginToken", val: vls });
}
async function getToken() {
  return await storeData("get", { key: "loginToken" });
}

function setTahun(vls) {
  storeData("set", { key: "pilihTahun", val: vls });
}
async function getTahun() {
  return await storeData("get", { key: "pilihTahun" });
}

export { storeData, setUser, getUser, setToken, getToken, setTahun, getTahun };
