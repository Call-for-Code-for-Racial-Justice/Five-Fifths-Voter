import { useWinstonLogger } from "~/server/utils/logging";
import { getAuthCookie } from "~/server/utils/authCookie";
export default defineEventHandler(async (event) => {
  const logger = useWinstonLogger("auth");
  const cookie = getAuthCookie(event);
  if (cookie.sub) {
    logger.info(`login cookie is valid: ${cookie.email}`);
  }
  return cookie;
});
