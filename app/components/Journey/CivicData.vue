<template>
  <div
    v-if="hasVoterInfo"
    class="mt-4 rounded border-2 border-solid border-carbon-gray-80 p-2"
  >
    <p>
      {{ voterState }}
      <span v-if="stateBody">
        -
        {{ stateBody }}
      </span>
      <span v-else>- state election information</span>
    </p>
    <cv-link
      v-if="electionInfoUrl"
      :href="electionInfoUrl"
      target="_blank"
    >
      Election Info
    </cv-link><br>
    <cv-link
      v-if="absenteeVotingInfoUrl"
      :href="absenteeVotingInfoUrl"
      target="_blank"
    >
      Get Absentee Ballot
    </cv-link><br>
    <span v-if="!locationAvailable">
      {{ $t("voteEarlyNoLocationFound") }}
    </span>
    <cv-select
      v-if="electionList.length"
      label="Select Your Election"
    >
      <cv-select-option selected>
        Choose an election
      </cv-select-option>
      <cv-select-option
        v-for="(item, index) in electionList"
        :key="index"
        :selected="index === 0 ? 'selected' : ''"
      >
        {{ item }}
      </cv-select-option>
    </cv-select>

    <span class="text-xs"><br>Powered by the Civic Information API</span>
  </div>
</template>

<script setup>
const voterInfo = useVoterInfoStore();

const hasVoterInfo = computed(() => !!voterInfo.info?.state);
const voterState = computed(() => {
  try {
    return voterInfo.info.state[0].name;
  }
  catch {
    return "";
  }
});
const stateBody = computed(() => {
  try {
    return voterInfo.info.state[0].electionAdministrationBody.name;
  }
  catch {
    return "";
  }
});

const electionInfoUrl = computed(() => {
  try {
    return voterInfo.info.state[0].electionAdministrationBody.electionInfoUrl;
  }
  catch {
    return "";
  }
});
const absenteeVotingInfoUrl = computed(() => {
  try {
    return voterInfo.info.state[0].electionAdministrationBody
      .absenteeVotingInfoUrl;
  }
  catch {
    return "";
  }
});
const locationAvailable = computed(() => {
  return (
    voterInfo.info?.earlyVoteSites?.length || voterInfo.info?.pollingLocations?.length || voterInfo.info?.dropOffLocations?.length
  );
});

/**
 * Sometimes GA defines multiple elections for an address.
 * @returns {array}
 */
const electionList = computed(() => {
  try {
    return voterInfo.info?.fivefifthsdata?.elections || [];
  }
  catch {
    return [];
  }
});
</script>
