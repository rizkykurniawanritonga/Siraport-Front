export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const tkn = await getToken();
    if (tkn) {
      await flashNotifikasi("set", "info", "Anda sudah login!");
      return navigateTo("/pilihtahun");
    }
  }
});
