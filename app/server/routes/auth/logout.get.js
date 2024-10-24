import { useWinstonLogger } from "~/server/utils/logging";
import { getAuthCookie, deleteAuthCookie } from "~/server/utils/authCookie";
export default defineEventHandler(async (event) => {
  const logger = useWinstonLogger("auth");
  const cookie = getAuthCookie(event);
  if (!cookie.sub) {
    logger.info(`login cookie is invalid`);
    return await sendRedirect(event, "/", 302);
  }

  deleteAuthCookie(event);
  await sendRedirect(event, "/whyVote", 302);
});
