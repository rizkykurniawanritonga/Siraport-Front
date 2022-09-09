import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = _.replace(_.replace(event.req.url, "/api", ""), "/readAkun", "");
  return await $fetch(`${config.public.apiBase}/api/v1${url}`, {
    method: "get",
    headers: { Authorization: `Bearer ${event.context.auth}` },
  });
});
