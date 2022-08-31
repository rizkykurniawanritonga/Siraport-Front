import { _ } from "lodash";
import { get, set } from "@vueuse/core";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function storeData(mode, sts = null) {
  // setItem, getItem, removeItem, clear
  // sts = key & val
  // 1. sts = {key: 'abc'}
  // 2. sts = {key: 'abc', val: 'def'}
  const dPrfx = "siraport-app";
  if (mode == "set") {
    const setStr = useCookie(`${dPrfx}:${sts.key}`);
    set(setStr, sts.val);
  } else if (mode == "get") {
    return get(useCookie(`${dPrfx}:${sts.key}`));
  } else if (mode == "delete") {
    set(useCookie(`${dPrfx}:${sts.key}`), null);
  } else if (mode == "destroy") {
    deleteAllCookies();
  } else if (mode == "flash") {
    const getFl = useCookie(`${dPrfx}:${sts.key}`);
    const sstr = get(getFl);
    set(getFl, null);
    return sstr;
  }
}

function setUser(dt) {
  storeData("set", { key: "users", val: dt });
}
function getUser(key) {
  const dt = storeData("get", { key: "users" });
  return dt[key];
}

function setToken(vls) {
  storeData("set", { key: "loginToken", val: vls });
}
function getToken() {
  return storeData("get", { key: "loginToken" });
}

function setTahun(vls) {
  storeData("set", { key: "pilihTahun", val: vls });
}
function getTahun() {
  return storeData("get", { key: "pilihTahun" });
}

export { storeData, setUser, getUser, setToken, getToken, setTahun, getTahun };
