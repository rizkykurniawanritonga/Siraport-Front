export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const tkn = await getToken();
    if (!tkn) {
      await flashNotifikasi(
        "set",
        "error",
        "Anda harus login terlebih dahulu!"
      );
      return navigateTo("/login");
    }
  }
});
