export default defineNuxtRouteMiddleware((to, from) => {
  const tkn = getToken();
  if (tkn) {
    flashNotifikasi("set", "info", "Anda sudah login!");
    return navigateTo("/pilihtahun");
  }
});
