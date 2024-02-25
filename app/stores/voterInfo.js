/**
 * @typedef {Object} CivicPollingLocation
 * @property {string} address - The address of the polling location.
 * @property {string} locationName - The name of the polling location.
 * @property {string} line1 - The first line of the address.
 * @property {string|undefined} line2 - The second line of the address.
 * @property {string} city - The city of the polling location.
 * @property {string} state - The state of the polling location.
 * @property {string} zip - The zip code of the polling location.
 * @property {string} latitude - The latitude of the polling location.
 * @property {string} longitude - The longitude of the polling location.
 * @property {string} notes - Additional notes about the polling location.
 * @property {string} pollingHours - The hours of operation for the polling location.
 * @property {string[]} sources - An array of sources for the polling location.
 *
 * @typedef {Object} CivicNormalizedInput
 * @property {string} line1 - The first line of the address
 * @property {string|undefined} line2 - The second line of the address
 * @property {string} city - The city of the address
 * @property {string} state - The state of the address
 * @property {string} zip - The zip code of the address
 *
 * @property {Object} CivicDistrict
 * @property {string} name - The name of the district
 * @property {string} scope - The scope of the district (e.g., schoolBoard)
 *
 * @typedef {Object} CivicContestBallotMeasure
 * @property {string} type - The type of contest (e.g., ballot-measure)
 * @property {string} electorateSpecifications - The electorate specifications for the contest
 * @property {string} ballotTitle - The title of the measure on the ballot
 * @property {string} ballotPlacement - The placement of the measure on the ballot
 * @property {string} referendumTitle - The title of the referendum
 * @property {string} referendumSubtitle - The subtitle of the referendum
 * @property {string} referendumUrl - The URL for the referendum
 * @property {string} referendumBrief - A brief description of the referendum
 * @property {string} referendumText - The text of the referendum
 * @property {string} referendumProStatement - The argument for the referendum
 * @property {Array.<string>} referendumBallotResponses - The possible responses to the referendum on the ballot
 * @property {Array.<Object>} sources
 *
 * @typedef {CivicContestBallotMeasure} CivicContest
 *
 * @typedef {Object} CivicInfoSource
 * @property {string} name - name of the source
 * @property {boolean} official - is official source
 *
 * @property {Object} CivicAdministrationBody
 * @property {string} electionInfoUrl - The URL for election information from the state's election administration body
 * @property {string} electionRegistrationUrl - The URL for registering to vote in the state
 * @property {string} electionRegistrationConfirmationUrl - The URL for confirming voter registration in the state
 * @property {string} absenteeVotingInfoUrl - The URL for absentee voting information in the state
 * @property {string} votingLocationFinderUrl - The URL for finding voting locations in the state
 * @property {string} electionRulesUrl - The URL for election rules and regulations in the state
 * @property {CivicInfoSource[]|undefined} - Source of information. e.g. Voting Information Project
 *
 * @typedef {Object} CivicVoterState
 * @property {string} name - The name of the state
 * @property {CivicAdministrationBody} electionAdministrationBody - Information about the governing body
 * @property {CivicAdministrationBody} local_jurisdiction - Additional information about the governing body
 * @property {CivicInfoSource[]|undefined} - Source of information. e.g. Voting Information Project
 *
 * @typedef {Object} election
 * @property {string} id - The unique identifier for the election
 * @property {string} name - The name of the election
 * @property {string} electionDay - The date of the election
 * @property {string} ocdDivisionId - The Open Congressional Data division ID for the election
 *
 * @typedef {Object} CivicVoterInfo
 * @property {CivicElection} election - info about the election.
 * @property {CivicNormalizedInput} normalizedInput - The normalized input for the election.
 * @property {CivicPollingLocation[]|undefined} pollingLocations - An array of polling locations for the election.
 * @property {CivicPollingLocation[]|undefined} earlyVoteSites - An array of early vote sites for the election.
 * @property {CivicPollingLocation[]|undefined} dropOffLocations - An array of drop off locations for the election.
 * @property {CivicContest[]} contests - An array of contests for the election.
 * @property {CivicVoterState[]} state - The state for the election.
 * @property {Object} fivefifthsdata
 * @property {boolean} mailOnly - A flag indicating if the election is a mail only election.
 * @property {string} kind - The type of the data object. (e.g., 'civicinfo#voterInfoResponse')
 */

/**
 * @typedef {import("pinia").StoreDefinition} StoreDefinition
 * @type {StoreDefinition<"voter-info", {status: string, info: CivicVoterInfo}, {}, {fetch(*, *): Promise<void>}>}
 */
export const useVoterInfoStore = defineStore("voter-info", {
  state: () => ({
    status: "loading",
    /** @type CivicVoterInfo */
    info: {},
  }),
  actions: {
    async fetch(address, electionId) {
      this.info = await $fetch("/api/voterInfo", {
        query: { address: address, electionId: electionId },
      });
      this.status = "loaded";
    },
  },
});
