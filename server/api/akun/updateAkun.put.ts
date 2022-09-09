import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await useBody(event);
  const query = useQuery(event);
  const url = _.split(_.replace(event.req.url, "/api", ""), "?", 1);
  return await $fetch(`${config.public.apiBase}/api/v1${url}/${query.id}`, {
    headers: { Authorization: `Bearer ${event.context.auth}` },
    method: "PUT",
    body: body,
  });
});
