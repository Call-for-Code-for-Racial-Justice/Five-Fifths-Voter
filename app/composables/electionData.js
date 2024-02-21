/**
 * @typedef CivicElection
 * @property {string} id - Unique identifier for the election
 * @property {string} name - Name of the election
 * @property {Date} electionDay - Date of the election
 * @property {string} ocdDivisionId - OCD division ID for the election
 */
// Sample data
// {
//     "id": "8112",
//     "name": "Washington Special Election",
//     "electionDay": "2024-02-13",
//     "ocdDivisionId": "ocd-division/country:us/state:wa"
// }
/**
 * @typedef CivicElectionsData
 * @property {CivicElection[]} elections - Array of elections
 * @property {string} kind - Type of response (civicinfo#electionsQueryResponse)
 */

/** @type CivicElectionsData */
const error = { elections: [], kind: "error" };
/** @type CivicElectionsData */
const loading = { elections: [], kind: "loading" };
/**
 * @type {Ref<UnwrapRef<CivicElectionsData>>}
 */
const electionData = ref(loading);
export const useElectionData = () =>
  useState("election-data", () => {
    const nuxtApp = useNuxtApp();
    useLazyFetch("/api/elections", {
      onResponse({ response }) {
        // Process the response data
        electionData.value = response._data;
      },
      onResponseError() {
        // Handle the response errors
        electionData.value = error;
      },
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    });

    return electionData;
  });
