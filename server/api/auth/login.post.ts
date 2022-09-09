import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await useBody(event);
  const url = _.replace(event.req.url, "/api", "");
  return await $fetch(`${config.public.apiBase}/api/v1${url}`, {
    method: "post",
    body: body,
  }).then(async (dt) => {
    await useStorage().setItem("redis:siraport-app:loginToken", {
      token: dt.data.token,
    });
    return dt;
  });
});
