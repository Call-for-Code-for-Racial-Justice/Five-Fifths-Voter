/**
 * @typedef AuthenticatedUser
 * @property {string|undefined} sub - uuid for user.
 * @property {string|undefined} email - email for user
 * @property {boolean|undefined} email_verified - email is verified
 * @property {string|undefined} name - user name
 * @property {string|undefined} given_name - given name
 * @property {string|undefined} family_name - family name
 * @property {number|undefined} exp - expiry time
 */
export const useUserStore = defineStore("user", {
  state: () => ({
    status: "loading",
    /** @type AuthenticatedUser */
    info: {},
  }),
  actions: {
    async fetch() {
      this.info = await $fetch("/auth/user");
      this.status = "loaded";
    },
  },
});
