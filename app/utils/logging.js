import winston from "winston";

export const useWinstonLogger = (meta) => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.printf((event) => {
        return `${JSON.stringify({ ...event, timestamp: new Date().toISOString() }, null, 4)}\n`;
      }),
    ),
    defaultMeta: { service: meta || "five-fifths-voter" },
    transports: [new winston.transports.Console()],
  });
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );

  return logger;
};
