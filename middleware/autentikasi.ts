export default defineNuxtRouteMiddleware((to, from) => {
  const tkn = getToken();
  if (!tkn) {
    flashNotifikasi("set", "error", "Anda harus login terlebih dahulu!");
    return navigateTo("/login");
  }
});
