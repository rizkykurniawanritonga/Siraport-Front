import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await useBody(event);
  const bs = _.replace(useQuery(event).chain, "-", "/");
  return await $fetch(`${config.public.apiBase}/api/v1/${bs}`, {
    headers: { Authorization: `Bearer ${event.context.auth}` },
    method: "post",
    body: body,
  });
});
