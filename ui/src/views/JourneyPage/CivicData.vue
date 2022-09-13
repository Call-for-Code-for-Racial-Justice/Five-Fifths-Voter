<template>
  <div v-if="voterData.state" class="journey-info__voter-data">
    <p>
      {{ voterData.state[0].name }}
      <span v-if="voterData.state[0].electionAdministrationBody.name">
        -
        {{ voterData.state[0].electionAdministrationBody.name }}
      </span>
    </p>
    <cv-link v-if="electionInfoUrl" :href="electionInfoUrl" target="_blank"> Election Info</cv-link
    ><br />
    <cv-link v-if="absenteeVotingInfoUrl" :href="absenteeVotingInfoUrl" target="_blank">
      Get Absentee Ballot</cv-link
    ><br />
    <span v-if="!locationAvailable"> {{ $t('voteEarlyNoLocationFound') }} </span>
    <cv-select v-if="electionList.length" label="Select Your Election">
      <cv-select-option selected>Choose an election</cv-select-option>
      <cv-select-option
        v-for="(item, index) in electionList"
        :key="index"
        :selected="index === 0 ? 'selected' : ''"
        >{{ item }}</cv-select-option
      >
    </cv-select>

    <span><br />Powered by the Civic Information API</span>
  </div>
</template>

<script>
/**
 * @typedef VoterData
 * @property {?Object} electionAdministrationBody
 * @property {?Array} VoterData.state
 */

export default {
  name: 'CivicData',
  props: {
    /**
     * @type VoterData
     */
    voterData: {
      type: Object,
      default: () => {
        return {
          state: null,

          pollingLocations: [],
          earlyVoteSites: [],
          dropOffLocations: [],
        };
      },
    },
  },
  computed: {
    electionInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.electionInfoUrl;
      } catch (error) {
        return '';
      }
    },
    absenteeVotingInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.absenteeVotingInfoUrl;
      } catch (error) {
        return '';
      }
    },
    locationAvailable() {
      return (
        this.voterData?.earlyVoteSites?.length ||
        this.voterData?.pollingLocations?.length ||
        this.voterData?.dropOffLocations?.length
      );
    },

    /**
     * Sometimes GA defines multiple elections for an address.
     * @returns {array}
     */
    electionList() {
      try {
        return this.voterData?.fivefifthsdata?.elections || [];
      } catch (error) {
        return [];
      }
    },
  },
};
</script>

<style lang="scss"></style>
