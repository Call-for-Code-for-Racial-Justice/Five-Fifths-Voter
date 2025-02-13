import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/index'
/** This provider is only available internally at IBM **/

/** The returned user profile from IBM W3 ID when using the profile callback. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBMW3IdProfile extends Record<string, any> {
  /**
     * The subject registered claim identifies the principal that's the subject of the identity token.
     * Since this token is meant for your application, the value is the unique identifier for the user.
     */
  sub: string

  /**
     * A String value representing the user's email address.
     * The email address is either the user's real email address or the proxy address,
     * depending on their status private email relay service.
     */
  email: string

  /**
     * A String or Boolean value that indicates whether the service has verified the email.
     * The value of this claim is always true, because the servers only return verified email addresses.
     * The value can either be a String (`"true"`) or a Boolean (`true`).
     */
  email_verified: 'true' | true

  /** The user's username. */
  name: string

  // TODO: add other fields here
}

export default function W3Id(
  config: OAuthUserConfig<IBMW3IdProfile>,
): OAuthConfig<IBMW3IdProfile> {
  return {
    type: 'oauth',
    id: 'w3id',
    name: 'w3id',
    authorization: { params: { scope: 'openid email' } },
    wellKnown: 'https://login.w3.ibm.com/oidc/endpoint/default/.well-known/openid-configuration',
    profile(profile) {
      // enable these to debug
      // console.log('profile callback', profile)
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
      }
    },
    options: config,
  }
}
