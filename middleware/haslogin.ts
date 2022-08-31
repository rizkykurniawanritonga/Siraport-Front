export default defineNuxtRouteMiddleware(async (to, from) => {
  const tkn = await getToken();
  setTimeout(async () => {
    if (tkn) {
      await flashNotifikasi("set", "info", "Anda sudah login!");
      return navigateTo("/pilihtahun");
    }
  }, 1000);
});
