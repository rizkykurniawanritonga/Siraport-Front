import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await useBody(event);
  const url = _.replace(event.req.url, "/api", "");
  return await $fetch(`${config.public.apiBase}/api/v1${url}`, {
    headers: { Authorization: `Bearer ${event.context.auth}` },
    method: "post",
    body: body,
  });
});
