import { useWinstonLogger } from "~/utils/logging";

function shouldInvalidateCache(event) {
  const query = getQuery(event);
  return query?.invalidate === "true";
}

export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger("civics-api");

    logger.log("info", "getting election data from civics API");
    return $fetch(`${event.context.civics.url}civicinfo/v2/elections`, {
      query: { ...event.context.civics.query },
    });
  },
  {
    maxAge: 60 * 60 * 24,
    shouldInvalidateCache,
    getKey: () => "civic:elections",
  },
);
