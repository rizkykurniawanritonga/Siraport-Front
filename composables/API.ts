import { useRuntimeConfig } from "#app";
async function apiKoneksi(url, options = null, mthd = "GET", mode = "mod") {
  let obj = {
    method: mthd,
    parseResponse: JSON.parse,
    baseURL: useRuntimeConfig().public.apiBase,
  };
  let tkn = {};
  if (await getToken())
    tkn = { headers: { Authorization: `Bearer ${await getToken()}` } };
  // obj variabile could be empty or not, it's the same
  obj = { ...obj, ...tkn, ...options };
  if (mode == "native") {
    return await useFetch(() => `/api/v1${url}`, obj);
  } else {
    const response = await $fetch.raw(`/api/v1${url}`, obj);
    return response._data;
  }
}

export { apiKoneksi };
