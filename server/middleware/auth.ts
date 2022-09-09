export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem("redis:siraport-app:loginToken");
  event.context.auth = data && data.token;
});
