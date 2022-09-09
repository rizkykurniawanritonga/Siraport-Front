import _ from "lodash";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const bs = _.replace(useQuery(event).chain, "-", "/");
  const id = useQuery(event).id
    ? `/${_.replace(useQuery(event).id, "-", "/")}`
    : "";
  return await $fetch(`${config.public.apiBase}/api/v1/${bs}${id}`, {
    method: "get",
    headers: { Authorization: `Bearer ${event.context.auth}` },
  });
});
