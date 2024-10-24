import { useWinstonLogger } from "~/server/utils/logging";
import useAuthClient from "~/server/utils/useAuthClient";
import { getAuthCookie, setAuthCookie } from "~/server/utils/authCookie";
import useAuthCallbackUrl from "~/server/utils/useAuthCallbackUrl";

export default defineEventHandler(async (event) => {
  const logger = useWinstonLogger("auth");

  const authClient = await useAuthClient();
  // const cookie = useAuthCookie();
  const cookie = getAuthCookie(event);

  const callbackUrl = useAuthCallbackUrl();

  const code_verifier = cookie.code_verifier;
  const params = authClient.callbackParams(event.node.req);
  const tokenSet = await authClient.callback(callbackUrl, params, {
    code_verifier,
  });
  /** token set shape:
   * {
   *   "access_token": "<opaque string>",
   *   "id_token": "<opaque string>",
   *   "token_type": "Bearer",
   *   "expires_at": 1716220240,
   *   "scope": "openid appid_default appid_readuserattr appid_readprofile appid_writeuserattr appid_authenticated"
   * }
   */

  const claims = tokenSet.claims();
  logger.info(`authenticated ${claims.email}`);
  /** claims shape:
   * {
   *   "iss": "https://us-south.appid.cloud.ibm.com/oauth/v4/f6dc5d11-67a9-491e-9b78-77c75dde3aaa",
   *   "aud": [ "<uuid>" ],
   *   "exp": 1716220240,
   *   "tenant": "<tenant id>",
   *   "iat": 1716216640,
   *   "email": "someone@example.com",
   *   "name": "John Doe",
   *   "sub": "<uuid>",
   *   "email_verified": true,
   *   "given_name": "John",
   *   "family_name": "Doe",
   *   "identities": [
   *     {
   *       "provider": "cloud_directory",
   *       "id": "<uuid>"
   *     }
   *   ],
   *   "amr": [
   *     "cloud_directory"
   *   ]
   * }
   */

  const userinfo = await authClient.userinfo(tokenSet.access_token);
  logger.info(`name ${userinfo.name}`);

  /** user info shape:
   * {
   *   "sub": "<uuid>",
   *   "name": "John Doe",
   *   "email": "someone@example.com",
   *   "given_name": "John",
   *   "family_name": "Doe",
   *   "identities": [
   *     {
   *       "provider": "cloud_directory",
   *       "id": "<uuid>",
   *       "idpUserInfo": {
   *         "displayName": "John Doe",
   *         "active": true,
   *         "mfaContext": {},
   *         "emails": [
   *           {
   *             "value": "someone@example.com",
   *             "primary": true
   *           }
   *         ],
   *         "meta": {
   *           "lastLogin": "2024-05-20T15:28:58.973Z",
   *           "created": "2022-03-22T03:13:11.155Z",
   *           "location": "/v1/<uuid>/Users/<uuid>",
   *           "lastModified": "2024-05-20T15:28:58.984Z",
   *           "resourceType": "User"
   *         },
   *         "schemas": [
   *           "urn:ietf:params:scim:schemas:core:2.0:User"
   *         ],
   *         "name": {
   *           "givenName": "John",
   *           "familyName": "Doe",
   *           "formatted": "John Doe"
   *         },
   *         "id": "<uuid>",
   *         "status": "CONFIRMED",
   *         "idpType": "cloud_directory"
   *       }
   *     }
   *   ]
   * }
   */

  setAuthCookie(event, {
    sub: claims.sub,
    email: claims.email,
    email_verified: claims.email_verified,
    name: claims.name,
    given_name: claims.given_name,
    family_name: claims.family_name,
  });

  await sendRedirect(event, "/", 302);
});
