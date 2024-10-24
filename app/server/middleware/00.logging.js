import { useWinstonLogger } from "~/server/utils/logging";

export default defineEventHandler((event) => {
  const logger = useWinstonLogger("server");
  const path = event.path.split("?")[0];
  logger.log(
    "info",
    `${getRequestIP(event, { xForwardedFor: true })} - - "${getMethod(event)} ${path} ${getRequestProtocol(event)}"`,
  );
});
