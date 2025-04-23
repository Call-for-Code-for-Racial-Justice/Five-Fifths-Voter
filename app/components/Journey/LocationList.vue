<script setup>
// import { Map32 as MapIcon } from "@carbon/icons-vue";
import { useVoterInfoStore } from "~/stores/voterInfo";

const voterInfo = useVoterInfoStore();

const pollingLocations = computed(() => {
  return voterInfo.info?.pollingLocations || [];
});
const earlyVoteSites = computed(() => {
  return voterInfo.info?.earlyVoteSites || [];
});
const hasSites = computed(() => {
  return earlyVoteSites.value.length || earlyVoteSites.value.length;
});

const dropOffLocations = computed(() => {
  return voterInfo.info?.dropOffLocations || [];
});
</script>

<template>
  <div v-if="hasSites">
    <JourneyLocations
      :locations="earlyVoteSites"
      label="Early Voting Location"
    />
    <JourneyLocations
      :locations="pollingLocations"
      label="In Person Voting Locations"
    />
    <JourneyLocations
      :locations="dropOffLocations"
      label="Ballot drop-off Locations"
    />
  </div>
</template>
