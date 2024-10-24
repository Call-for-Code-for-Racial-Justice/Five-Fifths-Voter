import { useWinstonLogger } from "~/server/utils/logging";

export default defineEventHandler((event) => {
  const paths = ["/api/elections", "/api/voterInfo"];
  const path = event.path.split("?")[0];
  if (!paths.includes(path)) return;

  const logger = useWinstonLogger("civics-api");

  logger.log("info", "setting data for: " + path);

  const apikey = process.env.CIVICS_APIKEY;
  if (!apikey) {
    throw createError({
      statusCode: 400,
      statusMessage: "civics apikey not defined",
    });
  }

  const url = process.env.CIVICS_URL;
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: "civics url not defined",
    });
  }

  event.context.civics = { url, query: { key: apikey } };
});
