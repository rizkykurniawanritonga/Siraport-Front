export default defineNuxtRouteMiddleware(async (to, from) => {
  const tkn = await getToken();
  setTimeout(async () => {
    if (!tkn) {
      await flashNotifikasi(
        "set",
        "error",
        "Anda harus login terlebih dahulu!"
      );
      return navigateTo("/login");
    }
  }, 1000);
});
