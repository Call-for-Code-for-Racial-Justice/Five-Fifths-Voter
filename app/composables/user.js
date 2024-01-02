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

export function setUserLocation(data) {
  const user = useState("user");
  if (data.region !== user.value.info?.location?.region) {
    user.value.info.location = data;
    user.value.info.source = "user";
    localStorage.setItem("user", JSON.stringify(user.value.info));
  }
}

callOnce(async () => {
  const user = useState("user");
  try {
    const localString = localStorage.getItem("user");
    if (localString) {
      user.value.info = JSON.parse(localString);
      user.value.info.fromCache = true;
    }
  } catch (e) {
    console.warn("loadInfo", e);
  }
  if (!user.value.info.location) {
    const data = await $fetch("https://ipapi.co/json/");
    // sample data
    // {
    //     "ip": "10.x.x.x",
    //     "network": "10.x.x.0/23",
    //     "version": "IPv4",
    //     "city": "Liberty",
    //     "region": "South Carolina",
    //     "region_code": "SC",
    //     "country": "US",
    //     "country_name": "United States",
    //     "country_code": "US",
    //     "country_code_iso3": "USA",
    //     "country_capital": "Washington",
    //     "country_tld": ".us",
    //     "continent_code": "NA",
    //     "in_eu": false,
    //     "postal": "29657",
    //     "latitude": 34.7846,
    //     "longitude": -82.6942,
    //     "timezone": "America/New_York",
    //     "utc_offset": "-0400",
    //     "country_calling_code": "+1",
    //     "currency": "USD",
    //     "currency_name": "Dollar",
    //     "languages": "en-US,es-US,haw,fr",
    //     "country_area": 9629091.0,
    //     "country_population": 327167434,
    //     "asn": "AS20115",
    //     "org": "CHARTER-20115"
    // }
    if (data.region !== user.value.info?.location?.region) {
      user.value.info.location = data;
      user.value.info.source = "ipapi";
      localStorage.setItem("user", JSON.stringify(user.value.info));
    }
  }
});

// mutations
const mutations = {
  setLocation(state, data) {
    if (data.region !== state.info?.location?.region) {
      state.info.location = data;
      localStorage.setItem("user", JSON.stringify(state.info));
    }
  },
  setRegistered(state, registered) {
    Vue.set(state.info, "registered", registered ? "presidential-2024" : "");
    localStorage.setItem("user", JSON.stringify(state.info));
  },
  setRequested(state, requested) {
    Vue.set(
      state.info,
      "requested_early",
      requested ? "presidential-2024" : "",
    );
    localStorage.setItem("user", JSON.stringify(state.info));
  },
  setVotingAddress(state, normalized_address) {
    Vue.set(state.info, "voting_address", normalized_address);
    localStorage.setItem("user", JSON.stringify(state.info));
  },
  setRedirected(state, redirected) {
    state.redirected = redirected;
  },
  loadInfo(state) {
    try {
      const localString = localStorage.getItem("user");
      if (localString) {
        const localData = JSON.parse(localString);
        state.info = localData;
      }
    } catch (e) {
      console.warn("loadInfo", e);
    }
  },
};
