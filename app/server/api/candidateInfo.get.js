import { useWinstonLogger } from "~/utils/logging";
import { getCandidates } from "~/server/utils/cloudant";

function shouldInvalidateCache(event) {
  const query = getQuery(event);
  return query?.invalidate === "true";
}
function candidatesByState(event) {
  /** @type {{date:String, state:String}, undefined} */
  const query = getQuery(event);
  const date = query?.date;
  const state = query?.state;
  return `candidates:${date}:${state}`;
}

export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger("civics-api");

    /** @type {{date:String, state:String}, undefined} */
    const query = getQuery(event);
    const date = query?.date;
    const state = query?.state;
    if (!date || !state) {
      throw createError({
        statusCode: 400,
        statusMessage: "election date & state are required",
      });
    }

    logger.log("info", `getting candidate data from cloudant ${date}:${state}`);
    return getCandidates(date, state);
  },
  { maxAge: 60 * 60 * 24, shouldInvalidateCache, getKey: candidatesByState },
);
