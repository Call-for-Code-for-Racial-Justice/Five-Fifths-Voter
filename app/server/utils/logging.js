import { createLogger, format, transports } from "winston";

export const useWinstonLogger = (meta) => {
  return createLogger({
    level: "info",
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf((info) => {
        return `${info.timestamp} ${info.level} [${info.service}] ${info.message}`;
      }),
    ),
    defaultMeta: { service: meta || "five-fifths-voter" },
    transports: [new transports.Console()],
  });
};
