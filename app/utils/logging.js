import winston from "winston";

const simpleService = winston.format.printf((info) => {
  const { level, message, service } = info;
  return `[${service}] ${level}: ${message}`;
  // return JSON.stringify(info, null, 2);
});
export const useWinstonLogger = (meta) => {
  return winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.colorize(), simpleService),
    defaultMeta: { service: meta || "five-fifths-voter" },
    transports: [new winston.transports.Console()],
  });
};
