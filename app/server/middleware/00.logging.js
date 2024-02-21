import { useWinstonLogger } from "~/utils/logging";

export default defineEventHandler((event) => {
  const logger = useWinstonLogger("server");
  logger.log(
    "info",
    `${getRequestIP(event, { xForwardedFor: true })} - - "${getMethod(event)} ${
      event.path
    } ${getRequestProtocol(event)}"`,
  );
});
