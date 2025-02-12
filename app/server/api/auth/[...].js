import merge from "lodash.merge";
// You can find an overview of all the prebuilt providers here: https://next-auth.js.org/providers/
// Use as show in the docs here: https://auth.sidebase.io/guide/authjs/nuxt-auth-handler#providers
// Used in sample deployment
import GithubProvider from "next-auth/providers/github";
// For IBMid or w3Id (available only internally at IBM), use one or both of these
import IBMidProvider from "@/server/utils/ibmid";
import W3idProvider from "@/server/utils/w3id";
// Use this for local development
import MockIdProvider from "@/server/utils/mockid";
import { NuxtAuthHandler } from "#auth";

let DefaultProvider;
if (process.env.AUTH_PROVIDER == "ibmid") DefaultProvider = IBMidProvider;
else if (process.env.AUTH_PROVIDER === "w3id") DefaultProvider = W3idProvider;
else if (process.env.AUTH_PROVIDER === "github")
  DefaultProvider = GithubProvider.default;
else if (process.env.AUTH_PROVIDER === "mock") DefaultProvider = MockIdProvider;
else throw new Error("No auth provider specified");

const runtimeConfig = useRuntimeConfig();

// The callback enabled on IBMid (or other openid) is like:
// host/api/auth/callback/{id}
// For an oath with AUTH_ID=ibmid on Code Engine
// https://YOUR_APP.us-east.codeengine.appdomain.cloud/api/auth/callback/ibmid
// or locally
// http://localhost:4507/api/auth/callback/ibmid

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption - NUXT_AUTH_SECRET required in production
  secret: runtimeConfig.authSecret,
  providers: [
    DefaultProvider({
      clientId: process.env.AUTH_CLIENT_ID || "",
      clientSecret: process.env.AUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      // enable these to debug
      // console.log('jwt profile', profile)
      // console.log('jwt account', account)
      // console.log('jwt token', token)
      if (account) {
        token.provider = account.provider;
      }
      if (profile) {
        token.emailVerified = profile.email_verified;
      }
      return token;
    },
    session({ session, token }) {
      // enable these to debug
      // console.log('session', session)
      // console.log('session token', token)

      // Return the modified session
      return merge(session, {
        user: {
          sub: token.sub,
          provider: token.provider,
          emailVerified: token.emailVerified,
        },
      });
    },
  },
});
