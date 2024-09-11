/**
 * @typedef locationInfo
 * @property {!string} region
 * @property {!string} region_code
 */

/**
 * @typedef userDetails
 * @property {?locationInfo} location
 * @property {!string} registered
 * @property {!string} requested_early
 */

/**
 * @typedef userInfo
 * @property {userDetails} info
 * @property {boolean} redirected
 */
export const useUser = () =>
  useState("user", () => {
    return {
      info: {
        location: null,
        registered: "",
        requested_early: "", // Absentee ballot requested and plan to vote early are the same logic
        voting_address: "",
        fromCache: false,
        source: "",
      },
      redirected: false,
    };
  });

export const setUserLocation = (data) => {
  // eslint-disable-next-line no-undef
  const user = useState("user");
  if (data.region !== user.value.info?.location?.region) {
    user.value.info.location = data;
    user.value.info.source = "user";
    localStorage.setItem("user", JSON.stringify(user.value.info));
  }
};
export const setUserRegistered = (confirm) => {
  const user = useState("user");
  user.value.info.registered = confirm ? "presidential-2024" : "";
  localStorage.setItem("user", JSON.stringify(user.value.info));
};
export const isUserRegistered = () => {
  const user = useState("user");
  return Boolean(user.value.info?.registered === "presidential-2024");
};
export const setUserRequestedBallot = (confirm) => {
  const user = useState("user");
  user.value.info.requested_early = confirm ? "presidential-2024" : "";
  localStorage.setItem("user", JSON.stringify(user.value.info));
};
export const isUserRequestedBallot = () => {
  const user = useState("user");
  return Boolean(user.value.info?.requested_early === "presidential-2024");
};

export const setVotingAddress = (normalizedAddress) => {
  const user = useState("user");
  user.value.info.voting_address = normalizedAddress;
  localStorage.setItem("user", JSON.stringify(user.value.info));
};

// mutations
// const mutations = {
//   setLocation(state, data) {
//     if (data.region !== state.info?.location?.region) {
//       state.info.location = data;
//       localStorage.setItem("user", JSON.stringify(state.info));
//     }
//   },
//
//   setRequested(state, requested) {
//     Vue.set(
//       state.info,
//       "requested_early",
//       requested ? "presidential-2024" : "",
//     );
//     localStorage.setItem("user", JSON.stringify(state.info));
//   },

//   setRedirected(state, redirected) {
//     state.redirected = redirected;
//   },
//   loadInfo(state) {
//     try {
//       const localString = localStorage.getItem("user");
//       if (localString) {
//         const localData = JSON.parse(localString);
//         state.info = localData;
//       }
//     } catch (e) {
//       console.warn("loadInfo", e);
//     }
//   },
// };
