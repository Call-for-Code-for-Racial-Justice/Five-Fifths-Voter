import { useWinstonLogger } from "~/server/utils/logging";
import { generators } from "openid-client";
import { getAuthCookie, setAuthCookie } from "~/server/utils/authCookie";
import useAuthClient from "~/server/utils/useAuthClient";
export default defineEventHandler(async (event) => {
  const logger = useWinstonLogger("auth");
  const cookie = getAuthCookie(event);
  if (cookie.sub) {
    logger.info(`login cookie is valid: ${cookie.email}`);
    return await sendRedirect(event, "/", 302);
  }
  const code_verifier = generators.codeVerifier();
  setAuthCookie(event, { code_verifier });
  const code_challenge = generators.codeChallenge(code_verifier);

  const client = await useAuthClient();
  const authUrl = client.authorizationUrl({
    scope: "openid email profile",
    code_challenge,
    code_challenge_method: "S256",
  });

  await sendRedirect(event, authUrl, 302);
});
