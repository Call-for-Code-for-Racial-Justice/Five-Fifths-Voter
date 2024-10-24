import { useWinstonLogger } from "~/server/utils/logging";

export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger("civics-api");

    /**
     * @type {{address:String, electionId:String}, undefined}
     */
    const query = getQuery(event);
    const address = query?.address;
    if (!address) {
      throw createError({
        statusCode: 400,
        statusMessage: "voter address is required",
      });
    }
    const electionId = query.electionId;
    if (!electionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "election id is required",
      });
    }

    logger.log("info", "getting voter data from civics API");
    return $fetch(`${event.context.civics.url}civicinfo/v2/voterinfo`, {
      query: { ...event.context.civics.query, address, id: electionId },
    });
  },
  { maxAge: 60 * 60 * 2 },
);
