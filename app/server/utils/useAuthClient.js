import { Issuer } from "openid-client";
import { useWinstonLogger } from "~/server/utils/logging";

let authClient = null;

export default async function () {
  if (authClient) return authClient;
  const logger = useWinstonLogger("auth");

  const appURL = process.env.CE || "http://localhost:4007";

  const issuer = await Issuer.discover(
    "https://us-south.appid.cloud.ibm.com/oauth/v4/f6dc5d11-67a9-491e-9b78-77c75dde3aaa/.well-known/openid-configuration",
  );
  logger.info(`open id issuer ${new URL(issuer.issuer).hostname}`);

  authClient = new issuer.Client({
    client_id: "66f79cbe-6e3d-40ee-9855-ee61909fce47",
    client_secret: "MDNhODI4YTUtNDU4Zi00OGZmLTkxMzItMDBhMzcyODg4ZjY3",
    redirect_uris: [appURL + "/auth/callback"],
    response_types: ["code"],
  });

  return authClient;
}
